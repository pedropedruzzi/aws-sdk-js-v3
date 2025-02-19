// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListAssetBundleExportJobsCommand,
  ListAssetBundleExportJobsCommandInput,
  ListAssetBundleExportJobsCommandOutput,
} from "../commands/ListAssetBundleExportJobsCommand";
import { QuickSightClient } from "../QuickSightClient";
import { QuickSightPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: QuickSightClient,
  input: ListAssetBundleExportJobsCommandInput,
  ...args: any
): Promise<ListAssetBundleExportJobsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListAssetBundleExportJobsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListAssetBundleExportJobs(
  config: QuickSightPaginationConfiguration,
  input: ListAssetBundleExportJobsCommandInput,
  ...additionalArguments: any
): Paginator<ListAssetBundleExportJobsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListAssetBundleExportJobsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof QuickSightClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected QuickSight | QuickSightClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
