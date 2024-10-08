import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/components/Home";
import CreateAuction from "./components/CreateAuction";
import { AuctionComponent } from "./components/AuctionComponent";
import { UserCreatedAuctionComponent } from "./components/UserCreatedAuctions";
import { UserBids } from "./components/UserBids";
// import About from './About';
// import Contact from './Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/new-auction" element={<CreateAuction />} />
          <Route path="/auction" element={<AuctionComponent />} />
          <Route path="/my-auctions" element={<UserCreatedAuctionComponent />} />
          <Route path="/my-bids" element={<UserBids />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
