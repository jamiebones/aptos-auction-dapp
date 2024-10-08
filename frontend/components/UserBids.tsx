import { useState, useEffect } from "react";
import { UserAuctionData } from "@/components/interface/UserAuctionData";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getAllUserBiddedAuction } from "@/view-functions/getAllUserBiddedAuction";


export const UserBids = () => {
  const [auctions, setAuctions] = useState<UserAuctionData[] | []>();
  const { account } = useWallet();

  const { data } = useQuery({
    queryKey: ["user-auctions", account?.address],
    refetchInterval: 10_000,
    queryFn: async () => {
      try {
        if (!account) return;
        const auction = await getAllUserBiddedAuction({
          bidder_address: account?.address as string,
        });
        return { auction };
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
        return {
          auction: [],
        };
      }
    },
  });

  useEffect(() => {
    if (data) {
      setAuctions(data.auction);
    }
  }, [data]);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col w-full space-y-6">
        {auctions?.length == 0 && <h1>You haven't bidded for any auction</h1>}
        {auctions &&
          auctions.length > 0 &&
          auctions.map((auctionData, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-6 mt-4">
                {/* My Bid */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">My Bid</h3>
                  <p className="text-gray-600">${auctionData.my_bid/ 100_000_000} APT</p>
                </div>

                {/* Highest Bidder */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Highest Bidder</h3>
                  <p className="text-gray-600">{auctionData.highest_bidder.vec[0] || "No highest bidder yet"}</p>
                </div>

                {/* Highest Bid */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Highest Bid</h3>
                  <p className="text-gray-600">
                    {auctionData.highest_bid.vec[0] ? `${auctionData.highest_bid.vec[0]/ 100_000_000} APT` : "No bids yet"}
                  </p>
                </div>

                {/* Auction Ended */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Auction Ended</h3>
                  <p className={`text-gray-600 ${auctionData.auction_ended ? "text-red-500" : "text-green-500"}`}>
                    {auctionData.auction_ended ? "Yes" : "No"}
                  </p>
                </div>

                {/* Total Bidders */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Total Bidders</h3>
                  <p className="text-gray-600">{auctionData.total_bidders}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
