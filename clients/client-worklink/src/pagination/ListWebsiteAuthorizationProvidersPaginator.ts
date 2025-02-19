// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListWebsiteAuthorizationProvidersCommand,
  ListWebsiteAuthorizationProvidersCommandInput,
  ListWebsiteAuthorizationProvidersCommandOutput,
} from "../commands/ListWebsiteAuthorizationProvidersCommand";
import { WorkLinkClient } from "../WorkLinkClient";
import { WorkLinkPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: WorkLinkClient,
  input: ListWebsiteAuthorizationProvidersCommandInput,
  ...args: any
): Promise<ListWebsiteAuthorizationProvidersCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListWebsiteAuthorizationProvidersCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListWebsiteAuthorizationProviders(
  config: WorkLinkPaginationConfiguration,
  input: ListWebsiteAuthorizationProvidersCommandInput,
  ...additionalArguments: any
): Paginator<ListWebsiteAuthorizationProvidersCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListWebsiteAuthorizationProvidersCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof WorkLinkClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected WorkLink | WorkLinkClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
