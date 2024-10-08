import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function TopBanner() {
  return (
    <div className="bg-yellow-600 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <nav className="p-2">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="text-white space-x-6 text-2xl font-bold">Auction Demo</div>

            {/* Menu Items */}
            <ul className="flex ml-4 space-x-6 text-white">
              <li className="hover:text-gray-300">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/new-auction">Create New Auction</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/my-auctions">My Auctions</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/my-bids">My Bids</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base text-black">
            Check out the{" "}
            <a
              target="blank"
              href="https://aptos.dev/en/build/create-aptos-dapp/templates/boilerplate"
              style={{ color: "white", textDecoration: "underline" }}
            >
              template docs
            </a>{" "}
            to get started.
          </span>
        </div>
      </div>
    </div>
  );
}
