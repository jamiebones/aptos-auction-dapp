import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
// Internal Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletDetails } from "@/components/WalletDetails";
import { AccountInfo } from "@/components/AccountInfo";
import { getAuctionData } from "@/view-functions/getAllActiveAuctions";
import { AuctionDataDetails } from "@/components/interface/AuctionDetails";
import { AuctionList } from "@/components/AuctionList";

function Home() {
  const { connected } = useWallet();
  //const queryClient = useQueryClient();
  const [auctions, setAuctions] = useState<AuctionDataDetails[]>([]);

  const { data } = useQuery({
    queryKey: ["active-auctions"],
    refetchInterval: 10_000,
    queryFn: async () => {
      try {
        const auction = await getAuctionData();
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
    <>
      <div className="flex justify-center min-h-screen bg-gray-100">
        <div className="flex w-full max-w-6xl">
          {/* First Section */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6 mx-1">
            {connected ? (
              <Card>
                <CardContent className="flex flex-col gap-10 pt-6">
                  <WalletDetails />
                  <AccountInfo />
                </CardContent>
              </Card>
            ) : (
              <CardHeader>
                <CardTitle>To get started Connect a wallet</CardTitle>
              </CardHeader>
            )}
          </div>

          {/* Second Section */}
          <div className="flex-2 bg-white shadow-lg rounded-lg p-6 mx-1">
            {auctions && <AuctionList auctionDataList={auctions} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
