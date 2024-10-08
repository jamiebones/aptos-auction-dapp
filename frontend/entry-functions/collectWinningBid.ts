
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";


export type CollectWinningBid = {
    auction_object: string; 
};

export const collectWinningBid = (args: CollectWinningBid): InputTransactionData => {
  const { auction_object } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::auction_contract::collect_winning_bid`,
      functionArguments: [auction_object ],
    },
  };
};










