import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { AuctionDataDetails } from "@/components/interface/AuctionDetails";
import { getUserCreatedAuction } from "@/view-functions/getUserCreatedAuction";
import { aptosClient } from "@/utils/aptosClient";
import { collectWinningBid } from "@/entry-functions/collectWinningBid";
import { Button } from "@/components/ui/button";

export const UserCreatedAuctionComponent = () => {
  const [auctions, setAuctions] = useState<AuctionDataDetails[] | []>();
  const { account, signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString(); // Convert Unix timestamp to readable date
  };

  const { data } = useQuery({
    queryKey: ["user-auctions", account?.address],
    refetchInterval: 10_000,
    queryFn: async () => {
      try {
        if (!account) return;
        const auction = await getUserCreatedAuction({
          owner_address: account?.address as string,
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

  const claimWinningBid = async (auction_ref: string) => {
    if (!account) {
      return;
    }
    try {
      const committedTransaction = await signAndSubmitTransaction(
        collectWinningBid({
          auction_object: auction_ref,
        }),
      );
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      queryClient.invalidateQueries();
      toast({
        title: "Auction amount claimed",
        description: `Transaction succeeded, hash: ${executedTransaction.hash}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      {auctions && auctions.length == 0 && <h1>No Auction created yet</h1>}
      {auctions &&
        auctions.length > 0 &&
        auctions.map((auctionData, index) => {
          return (
            <>
              <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6 space-y-4" key={index}>
                <h2 className="text-2xl font-bold text-blue-600">Auction Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Owner</h3>
                    <p className="text-gray-600">{auctionData && truncateAddress(auctionData?.owner)}</p>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Brief Description</h3>
                    <p className="text-gray-600">{auctionData?.auction_brief_description}</p>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Auction URL</h3>
                    <a
                      href={auctionData?.auction_url}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Auction
                    </a>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Description URL</h3>
                    <a
                      href={auctionData?.auction_description_url}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More Info
                    </a>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Highest Bidder</h3>
                    <p className="text-gray-600">
                      {(auctionData && truncateAddress(auctionData?.highest_bidder.vec[0])) || "No bids yet"}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Highest Bid</h3>
                    <p className="text-gray-600">
                      {auctionData?.highest_bid.vec[0]
                        ? `${auctionData.highest_bid.vec[0] / 100_000_000} APT`
                        : "No bids yet"}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Auction End Time</h3>
                    <p className="text-gray-600">{auctionData && formatDate(auctionData.auction_end_time / 1000)}</p>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Created Date</h3>
                    <p className="text-gray-600">{auctionData && formatDate(auctionData.created_date)}</p>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Number of Bidders</h3>
                    <p className="text-gray-600">{auctionData?.num_of_bidders}</p>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Auction Ended</h3>
                    <p className="text-gray-600">{auctionData?.auction_ended ? "Yes" : "No"}</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={() => claimWinningBid(auctionData?.auction_reference?.inner as string)}>
                    collect winning bid
                  </Button>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};
