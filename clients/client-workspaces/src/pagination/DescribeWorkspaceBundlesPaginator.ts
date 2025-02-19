// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  DescribeWorkspaceBundlesCommand,
  DescribeWorkspaceBundlesCommandInput,
  DescribeWorkspaceBundlesCommandOutput,
} from "../commands/DescribeWorkspaceBundlesCommand";
import { WorkSpacesClient } from "../WorkSpacesClient";
import { WorkSpacesPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: WorkSpacesClient,
  input: DescribeWorkspaceBundlesCommandInput,
  ...args: any
): Promise<DescribeWorkspaceBundlesCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeWorkspaceBundlesCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateDescribeWorkspaceBundles(
  config: WorkSpacesPaginationConfiguration,
  input: DescribeWorkspaceBundlesCommandInput,
  ...additionalArguments: any
): Paginator<DescribeWorkspaceBundlesCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeWorkspaceBundlesCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    if (config.client instanceof WorkSpacesClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected WorkSpaces | WorkSpacesClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
