
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";


export type CloseAuctionArguments = {
    auction_object: string; 
};

export const closeAuction = (args: CloseAuctionArguments): InputTransactionData => {
  const { auction_object } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::auction_contract::close_auction`,
      functionArguments: [auction_object ],
    },
  };
};










