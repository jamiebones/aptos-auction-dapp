export interface AuctionDataDetails {
    owner: string; 
    auction_brief_description: string;
    auction_description_url: string;
    highest_bidder: {vec: [string | undefined ]};
    highest_bid: {vec: [number | undefined ]};
    auction_end_time: number;
    created_date: number;
    auction_ended: boolean;
    auction_url: string;
    num_of_bidders: number;
    auction_reference: {inner: string | undefined};
  }
  

  