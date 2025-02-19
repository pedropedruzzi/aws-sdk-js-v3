// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  GetReservedNodeExchangeOfferingsCommand,
  GetReservedNodeExchangeOfferingsCommandInput,
  GetReservedNodeExchangeOfferingsCommandOutput,
} from "../commands/GetReservedNodeExchangeOfferingsCommand";
import { RedshiftClient } from "../RedshiftClient";
import { RedshiftPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: RedshiftClient,
  input: GetReservedNodeExchangeOfferingsCommandInput,
  ...args: any
): Promise<GetReservedNodeExchangeOfferingsCommandOutput> => {
  // @ts-ignore
  return await client.send(new GetReservedNodeExchangeOfferingsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateGetReservedNodeExchangeOfferings(
  config: RedshiftPaginationConfiguration,
  input: GetReservedNodeExchangeOfferingsCommandInput,
  ...additionalArguments: any
): Paginator<GetReservedNodeExchangeOfferingsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.Marker
  let token: typeof input.Marker | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: GetReservedNodeExchangeOfferingsCommandOutput;
  while (hasNext) {
    input.Marker = token;
    input["MaxRecords"] = config.pageSize;
    if (config.client instanceof RedshiftClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Redshift | RedshiftClient");
    }
    yield page;
    const prevToken = token;
    token = page.Marker;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
