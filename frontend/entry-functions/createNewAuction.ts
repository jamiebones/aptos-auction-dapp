import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type CreateNewAuctionArguments = {
    auction_brief_description: string; 
    auction_description_url: string;
    auction_end_date: number
};

export const createNewAuction = (args: CreateNewAuctionArguments): InputTransactionData => {
  const { auction_brief_description, auction_description_url, auction_end_date } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::auction_contract::create_new_auction`,
      functionArguments: [auction_brief_description, auction_description_url, auction_end_date ],
    },
  };
};
