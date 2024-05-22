import { GetCostAndUsageCommandOutput } from "@aws-sdk/client-cost-explorer";
import { AwsServiceCost } from "./config";

export default function ExtractCost(response: GetCostAndUsageCommandOutput) {
  const results = response.ResultsByTime;

  const services: string[] = [];
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
        if (services.includes(key)) return;
        services.push(key);
      });
    });
  });

  console.log(services, serviceCost);
}
