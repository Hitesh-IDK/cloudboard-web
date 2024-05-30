import { GetCostAndUsageCommandOutput } from "@aws-sdk/client-cost-explorer";
import { AwsServiceCost, AwsServiceData } from "./config";

export default function ExtractCost(response: GetCostAndUsageCommandOutput) {
  const results = response.ResultsByTime;

  const services: AwsServiceData[] = [];
  const serviceCost: AwsServiceCost[] = [];

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

        serviceCost.push({
          unit: group.Metrics.UnblendedCost.Unit || "N/A",
          cost: Number.isNaN(cost) ? 0 : cost,
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
            service.unit = group.Metrics?.UnblendedCost.Unit || "N/A";
            service.cost = Number.isNaN(cost)
              ? tempServiceCost
                ? tempServiceCost
                : 0
              : tempServiceCost + cost;
          }
        });

        if (!inserted) {
          services.push({
            unit: group.Metrics?.UnblendedCost.Unit || "N/A",
            cost: cost,
            serviceName: key,
          });
        }
      });
    });
  });
  console.log(services, serviceCost);
}
