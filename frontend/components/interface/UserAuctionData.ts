
export interface UserAuctionData {
    my_bid: number; 
    highest_bidder: {vec: [string | undefined ]};
    highest_bid: {vec: [number | undefined ]};
    auction_ended: boolean;
    total_bidders: number;
    auction_reference: {inner: string};
  }
  

