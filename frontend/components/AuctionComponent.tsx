import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { AuctionDataDetails } from "@/components/interface/AuctionDetails";
import { makeAuctionBid } from "@/entry-functions/makeAuctionBid";
import { closeAuction } from "@/entry-functions/closeAuction";
import { aptosClient } from "@/utils/aptosClient";
import { Button } from "@/components/ui/button";

export const AuctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [auctionData, setAuctionData] = useState<AuctionDataDetails | undefined>();
  const [bidAmount, setBidAmount] = useState(0);

  const { account, signAndSubmitTransaction } = useWallet();
  const decimal = 100_000_000;

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
    setAuctionData(data);
  }, [data]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString(); // Convert Unix timestamp to readable date
  };

  const placeBid = async () => {
    if (!account || !bidAmount || !auctionData) {
      return;
    }
    try {
      const committedTransaction = await signAndSubmitTransaction(
        makeAuctionBid({
          auction_object: auctionData?.auction_reference.inner as string,
          bid_amount: bidAmount * decimal,
        }),
      );
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      toast({
        title: "Success",
        description: `Transaction succeeded, hash: ${executedTransaction.hash}`,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const closeAuctionAfterEnding = async (auction_ref: string) => {
    try {
      const committedTransaction = await signAndSubmitTransaction(
        closeAuction({
          auction_object: auction_ref,
        }),
      );
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });

      toast({
        title: "Auction closed and refund make to bidders",
        description: `Transaction succeeded, hash: ${executedTransaction.hash}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6 space-y-4">
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
              {auctionData?.highest_bid.vec[0] ? `${auctionData.highest_bid.vec[0] / decimal} APT` : "No bids yet"}
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold">Auction End Time</h3>
            <p className="text-gray-600">{auctionData && formatDate(auctionData.auction_end_time / 1_000_000)}</p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold">Created Date</h3>
            <p className="text-gray-600">{auctionData && formatDate(auctionData.created_date / 1_000_000)}</p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold">Number of Bidders</h3>
            <p className="text-gray-600">{auctionData?.num_of_bidders}</p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold">Auction Ended</h3>
            <p className="text-gray-600">{auctionData?.auction_ended ? "Yes" : "No"}</p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold">Auction Reference</h3>
            <p className="text-gray-600">{auctionData?.auction_reference.inner}</p>
          </div>
        </div>
        <hr />
        <div className="space-x-4 text-center">
          {/* Input */}
          <input
            onChange={(e) => setBidAmount(+e.target.value)}
            type="number"
            placeholder="place bid"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            onClick={placeBid}
            className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            place bid
          </button>
        </div>
        <hr />

        <Button variant={"green"} size={"lg"} onClick={() => closeAuctionAfterEnding(auctionData?.auction_reference.inner as string)}>
          close aution
        </Button>
      </div>
    </div>
  );
};
