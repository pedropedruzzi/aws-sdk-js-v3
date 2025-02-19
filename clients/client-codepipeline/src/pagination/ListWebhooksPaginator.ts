// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import { CodePipelineClient } from "../CodePipelineClient";
import {
  ListWebhooksCommand,
  ListWebhooksCommandInput,
  ListWebhooksCommandOutput,
} from "../commands/ListWebhooksCommand";
import { CodePipelinePaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: CodePipelineClient,
  input: ListWebhooksCommandInput,
  ...args: any
): Promise<ListWebhooksCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListWebhooksCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListWebhooks(
  config: CodePipelinePaginationConfiguration,
  input: ListWebhooksCommandInput,
  ...additionalArguments: any
): Paginator<ListWebhooksCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListWebhooksCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof CodePipelineClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected CodePipeline | CodePipelineClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
