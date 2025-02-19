// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListHarvestJobsCommand,
  ListHarvestJobsCommandInput,
  ListHarvestJobsCommandOutput,
} from "../commands/ListHarvestJobsCommand";
import { MediaPackageClient } from "../MediaPackageClient";
import { MediaPackagePaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: MediaPackageClient,
  input: ListHarvestJobsCommandInput,
  ...args: any
): Promise<ListHarvestJobsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListHarvestJobsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListHarvestJobs(
  config: MediaPackagePaginationConfiguration,
  input: ListHarvestJobsCommandInput,
  ...additionalArguments: any
): Paginator<ListHarvestJobsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListHarvestJobsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof MediaPackageClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected MediaPackage | MediaPackageClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
