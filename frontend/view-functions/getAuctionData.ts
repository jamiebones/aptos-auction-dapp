import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";

import { AuctionDataDetails } from "@/components/interface/AuctionDetails"

export type AuctionDataArguments = {
    auction_ref: string;
};

export const getAuctionData = async (args: AuctionDataArguments): Promise<AuctionDataDetails> => {
  const { auction_ref } = args;
  const auction = await aptosClient().view<[AuctionDataDetails]>({
    payload: {
      function: `${MODULE_ADDRESS}::auction::get_auction_data`,
      functionArguments: [auction_ref],
    },
  });
  return auction[0];
};



