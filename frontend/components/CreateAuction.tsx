import { FormEvent, useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { aptosClient } from '@/utils/aptosClient';
import { createNewAuction } from "@/entry-functions/createNewAuction";

const CreateAuction = () => {
  const [auctionDescription, setAuctionDescription] = useState('');
  const [auctionUrl, setAuctionUrl] = useState('');
  const [auctionDate, setAuctionDate] = useState('');

  const { account, signAndSubmitTransaction } = useWallet();
  let navigate = useNavigate();


  const createNewAuctionFunction = async (e: FormEvent) => {
    e.preventDefault();
    if (!account || !auctionDescription || !auctionUrl || !auctionDate) {
      return;
    }
    try {
        const date = new Date(auctionDate);
        const endOfAuction = date.getTime();
        const committedTransaction = await signAndSubmitTransaction(
        createNewAuction({
            auction_brief_description: auctionDescription,
            auction_description_url: auctionUrl,
            auction_end_date: endOfAuction
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
    }finally{
        setAuctionDate("");
        setAuctionDescription("");
        setAuctionUrl("");
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={createNewAuctionFunction}
        className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-xl font-bold mb-4">Create Auction</h2>

        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="font-medium text-gray-700">
            Auction Description
          </label>
          <textarea
            id="description"
            value={auctionDescription}
            onChange={(e) => setAuctionDescription(e.target.value)}
            placeholder="Describe your auction..."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="url" className="font-medium text-gray-700">
            Auction Website URL
          </label>
          <input
            id="url"
            type="url"
            value={auctionUrl}
            onChange={(e) => setAuctionUrl(e.target.value)}
            placeholder="https://example.com"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="date" className="font-medium text-gray-700">
            Auction Date
          </label>
          <input
            id="date"
            type="date"
            value={auctionDate}
            onChange={(e) => setAuctionDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition"
        >
          Create Auction
        </button>
      </form>
    </div>
  );
};

export default CreateAuction;