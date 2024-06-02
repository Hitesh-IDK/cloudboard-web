import {
  CostExplorerClient,
  GetCostAndUsageCommand,
  GetCostAndUsageCommandInput,
} from "@aws-sdk/client-cost-explorer";
import config, { AwsConfig } from "./config";
import ExtractCost from "./extractCost";

export default async function GetCostUsage(start: Date, end: Date) {
  if (
    config.credentials.accessKeyId === undefined ||
    config.credentials.secretAccessKey === undefined
  )
    return;

  const client = new CostExplorerClient(config);

  const endDate = end.toISOString().slice(0, 10);
  let startDate = start.toISOString().slice(0, 10);

  const startDateSplit = startDate.split("-");
  const endDateSplit = endDate.split("-");

  if (
    startDateSplit[3] === endDateSplit[3] &&
    end.getTime() - start.getTime() < 86400000
  ) {
    startDate = new Date(end.getTime() - 86400000).toISOString().slice(0, 10);
  }

  const input: GetCostAndUsageCommandInput = {
    TimePeriod: {
      // DateInterval
      Start: "2024-04-10", // required
      End: "2024-04-11", // required
    },
    Granularity: "DAILY", // required
    Metrics: ["UnblendedCost"],
    GroupBy: [
      {
        Type: "DIMENSION",
        Key: "SERVICE",
      },
    ],
  };

  const command = new GetCostAndUsageCommand(input);

  const response = await client.send(command);
  return ExtractCost(response);
}
