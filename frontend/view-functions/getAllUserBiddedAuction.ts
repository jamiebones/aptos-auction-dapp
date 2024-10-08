import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";

import { UserAuctionData  } from "@/components/interface/UserAuctionData"

export type AuctionsBiddedOnArguments = {
    bidder_address: string;
};

export const getAllUserBiddedAuction = async (args: AuctionsBiddedOnArguments): Promise<[UserAuctionData ]> => {
  const { bidder_address } = args;
  const auctionsBiddedOn = await aptosClient().view<[[UserAuctionData]]>({
    payload: {
      function: `${MODULE_ADDRESS}::auction_contract::get_all_auctions_user_bidded_on`,
      functionArguments: [bidder_address],
    },
  });
  return auctionsBiddedOn[0];
};

