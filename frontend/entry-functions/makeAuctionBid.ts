import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";


export type MakeAuctionBidArguments = {
    auction_object: string; 
    bid_amount: number
};

export const makeAuctionBid = (args: MakeAuctionBidArguments): InputTransactionData => {
  const { auction_object, bid_amount } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::auction_contract::make_auction_bid`,
      functionArguments: [auction_object, BigInt(bid_amount) ],
    },
  };
};
