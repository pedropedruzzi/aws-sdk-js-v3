// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  GetResourceMetricsCommand,
  GetResourceMetricsCommandInput,
  GetResourceMetricsCommandOutput,
} from "../commands/GetResourceMetricsCommand";
import { PIClient } from "../PIClient";
import { PIPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: PIClient,
  input: GetResourceMetricsCommandInput,
  ...args: any
): Promise<GetResourceMetricsCommandOutput> => {
  // @ts-ignore
  return await client.send(new GetResourceMetricsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateGetResourceMetrics(
  config: PIPaginationConfiguration,
  input: GetResourceMetricsCommandInput,
  ...additionalArguments: any
): Paginator<GetResourceMetricsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: GetResourceMetricsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof PIClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected PI | PIClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
