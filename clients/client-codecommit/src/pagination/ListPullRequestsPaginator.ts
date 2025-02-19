// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import { CodeCommitClient } from "../CodeCommitClient";
import {
  ListPullRequestsCommand,
  ListPullRequestsCommandInput,
  ListPullRequestsCommandOutput,
} from "../commands/ListPullRequestsCommand";
import { CodeCommitPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: CodeCommitClient,
  input: ListPullRequestsCommandInput,
  ...args: any
): Promise<ListPullRequestsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListPullRequestsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListPullRequests(
  config: CodeCommitPaginationConfiguration,
  input: ListPullRequestsCommandInput,
  ...additionalArguments: any
): Paginator<ListPullRequestsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListPullRequestsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof CodeCommitClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected CodeCommit | CodeCommitClient");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
