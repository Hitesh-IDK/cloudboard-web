import {
  GetResourcesCommand,
  ResourceGroupsTaggingAPIClient,
} from "@aws-sdk/client-resource-groups-tagging-api";
import config from "./config";

export default async function GetTags() {
  const tagList: string[] = [];
  const client = new ResourceGroupsTaggingAPIClient(config);
  const input = {
    ResourcesPerPage: Number("int"),
    TagsPerPage: Number("int"),
  };
  const command = new GetResourcesCommand(input);
  const response = await client.send(command);

  const resourceTagMapping = response.ResourceTagMappingList;

  resourceTagMapping?.forEach((resource) => {
    resource.Tags?.forEach((tag) => {
      if (!tag.Value) return;
      if (!tagList.includes(tag.Value)) {
        tagList.push(tag.Value);
      }
    });
  });

  return tagList;
}
