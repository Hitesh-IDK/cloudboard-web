import {
  CostExplorerClient,
  GetCostAndUsageCommand,
  GetCostAndUsageCommandInput,
} from "@aws-sdk/client-cost-explorer";
import config, { AwsConfig } from "./config";
import ExtractCost from "./extractCost";

export default async function GetCostUsage() {
  if (
    config.credentials.accessKeyId === undefined ||
    config.credentials.secretAccessKey === undefined
  )
    return;

  const client = new CostExplorerClient(config);

  const input: GetCostAndUsageCommandInput = {
    TimePeriod: {
      // DateInterval
      Start: "2024-04-01", // required
      End: "2024-05-22", // required
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
