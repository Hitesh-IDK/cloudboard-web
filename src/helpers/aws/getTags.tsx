import {
  GetResourcesCommand,
  ResourceGroupsTaggingAPIClient,
} from "@aws-sdk/client-resource-groups-tagging-api";
import config from "./config";

export default async function GetTags() {
  const client = new ResourceGroupsTaggingAPIClient(config);
  const input = {
    ResourcesPerPage: Number("int"),
    TagsPerPage: Number("int"),
  };
  const command = new GetResourcesCommand(input);
  const response = await client.send(command);

  console.log(response);
}
