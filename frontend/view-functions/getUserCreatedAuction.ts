import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";

import { AuctionDataDetails } from "@/components/interface/AuctionDetails"

export type UserCreatedAuctionArguments = {
    owner_address: string;
};

export const getUserCreatedAuction = async (args: UserCreatedAuctionArguments): Promise<[AuctionDataDetails]> => {
  const { owner_address } = args;
  const myAuctions = await aptosClient().view<[[AuctionDataDetails]]>({
    payload: {
      function: `${MODULE_ADDRESS}::auction_contract::get_auction_created_by_me`,
      functionArguments: [owner_address],
    },
  });
  return myAuctions[0];
};



