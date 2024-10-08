import React from "react";
import { AuctionDataDetails } from "@/components/interface/AuctionDetails";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from 'react-router-dom';

interface AuctionListProps {
  auctionDataList: AuctionDataDetails[];
}

export const AuctionList: React.FC<AuctionListProps> = ({ auctionDataList }) => {
  const navigate = useNavigate();

  const navigateToAuctionDetails = (auctionData: AuctionDataDetails) => {
    // Pass data to the new component
    navigate('/auction', { state: { data: auctionData} });
  };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 space-y-6">
      {auctionDataList.map((auctionData, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6 space-y-4">
          <h2 className="text-2xl font-bold text-blue-600">Auction {index + 1}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <h3 className="text-lg font-semibold">Owner</h3>
              <p className="text-gray-600">{truncateAddress(auctionData.owner)}</p>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-semibold">Brief Description</h3>
              <p className="text-gray-600">{auctionData.auction_brief_description}</p>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-semibold">Description URL</h3>
              <a
                href={auctionData.auction_description_url}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                More Info
              </a>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-semibold">Number of Bidders</h3>
              <p className="text-gray-600">{auctionData.num_of_bidders}</p>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={()=>navigateToAuctionDetails(auctionData)}>view details</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
