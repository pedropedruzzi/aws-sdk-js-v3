// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import { AppflowClient } from "../AppflowClient";
import { ListFlowsCommand, ListFlowsCommandInput, ListFlowsCommandOutput } from "../commands/ListFlowsCommand";
import { AppflowPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: AppflowClient,
  input: ListFlowsCommandInput,
  ...args: any
): Promise<ListFlowsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListFlowsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListFlows(
  config: AppflowPaginationConfiguration,
  input: ListFlowsCommandInput,
  ...additionalArguments: any
): Paginator<ListFlowsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListFlowsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof AppflowClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Appflow | AppflowClient");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
