
import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";
import { AuctionDataDetails } from "@/components/interface/AuctionDetails"


export const getAuctionData = async (): Promise<[AuctionDataDetails]> => {
 
  const activeAuctions = await aptosClient().view<[[AuctionDataDetails]]>({
    payload: {
      function: `${MODULE_ADDRESS}::auction_contract::get_all_active_auctions`,
      functionArguments: [],
    },
  });
  return activeAuctions[0];
};



