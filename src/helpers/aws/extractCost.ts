import { GetCostAndUsageCommandOutput } from "@aws-sdk/client-cost-explorer";
import {
  AwsDataExtracted,
  AwsServiceCostUsage,
  AwsServiceData,
  AwsServiceUsage,
} from "./config";

export default function ExtractCostUsage(
  response: GetCostAndUsageCommandOutput
): AwsDataExtracted {
  const results = response.ResultsByTime;

  const services: AwsServiceData[] = [];
  const serviceCost: AwsServiceCostUsage[] = [];
  const serviceUsage: AwsServiceUsage[] = [];

  results?.forEach((result) => {
    result.Groups?.forEach((group) => {
      group.Keys?.forEach((key) => {
        if (!group.Metrics) return;

        if (
          !result.TimePeriod ||
          !result.TimePeriod.Start ||
          !result.TimePeriod.End
        )
          return;

        const cost = Number(group.Metrics.UnblendedCost.Amount);
        const usage = Number(group.Metrics.UsageQuantity.Amount);

        serviceCost.push({
          unit: group.Metrics.UnblendedCost.Unit || "N/A",
          cost: Number.isNaN(cost) ? 0 : cost,
          usage: Number.isNaN(usage) ? 0 : usage,
          serviceName: key,
          timeperiod: {
            start: result.TimePeriod.Start,
            end: result.TimePeriod.End,
          },
        });

        let inserted = false;

        services.forEach((service) => {
          if (service.serviceName === key) {
            inserted = true;
            const tempServiceCost = service.cost ? service.cost : 0;
            const tempServiceUsage = service.usage ? service.usage : 0;
            service.unit = group.Metrics?.UnblendedCost.Unit || "N/A";
            service.usage = tempServiceUsage + usage;
            service.cost = tempServiceCost + cost;
          }
        });

        if (!inserted) {
          services.push({
            unit: group.Metrics?.UnblendedCost.Unit || "N/A",
            cost: cost,
            usage: usage,
            serviceName: key,
          });
        }

        const tempServiceUsageItem: AwsServiceUsage = {
          usage: usage,
          serviceName: key,
          timeperiod: {
            start: result.TimePeriod.Start,
            end: result.TimePeriod.End,
          },
        };

        serviceUsage.push(tempServiceUsageItem);
      });
    });
  });

  services.sort((a, b) => {
    return b.cost! - a.cost!;
  });

  console.log(serviceUsage, services);
  return { services, serviceUsage: serviceUsage };
}
