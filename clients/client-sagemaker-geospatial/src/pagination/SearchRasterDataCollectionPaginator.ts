// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  SearchRasterDataCollectionCommand,
  SearchRasterDataCollectionCommandInput,
  SearchRasterDataCollectionCommandOutput,
} from "../commands/SearchRasterDataCollectionCommand";
import { SageMakerGeospatialClient } from "../SageMakerGeospatialClient";
import { SageMakerGeospatialPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: SageMakerGeospatialClient,
  input: SearchRasterDataCollectionCommandInput,
  ...args: any
): Promise<SearchRasterDataCollectionCommandOutput> => {
  // @ts-ignore
  return await client.send(new SearchRasterDataCollectionCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateSearchRasterDataCollection(
  config: SageMakerGeospatialPaginationConfiguration,
  input: SearchRasterDataCollectionCommandInput,
  ...additionalArguments: any
): Paginator<SearchRasterDataCollectionCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: SearchRasterDataCollectionCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    if (config.client instanceof SageMakerGeospatialClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected SageMakerGeospatial | SageMakerGeospatialClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
