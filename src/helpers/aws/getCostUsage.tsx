import {
  CostExplorerClient,
  GetCostAndUsageCommand,
  GetCostAndUsageCommandInput,
} from "@aws-sdk/client-cost-explorer";
import config, { AwsConfig, AwsServiceCost } from "./config";
import ExtractCost from "./extractCost";

export default async function GetCostUsage() {
  const accessKey = localStorage.getItem("accessKey");
  const secretKey = localStorage.getItem("secretKey");

  if (accessKey === null || secretKey === null) return;

  const newConfig: AwsConfig = {
    ...config,
    credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
  };

  const client = new CostExplorerClient(newConfig);
  console.log("Hey");

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
  ExtractCost(response);
}
