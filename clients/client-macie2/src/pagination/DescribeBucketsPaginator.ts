// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  DescribeBucketsCommand,
  DescribeBucketsCommandInput,
  DescribeBucketsCommandOutput,
} from "../commands/DescribeBucketsCommand";
import { Macie2Client } from "../Macie2Client";
import { Macie2PaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: Macie2Client,
  input: DescribeBucketsCommandInput,
  ...args: any
): Promise<DescribeBucketsCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeBucketsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateDescribeBuckets(
  config: Macie2PaginationConfiguration,
  input: DescribeBucketsCommandInput,
  ...additionalArguments: any
): Paginator<DescribeBucketsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeBucketsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof Macie2Client) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Macie2 | Macie2Client");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
