
// Internal Components
import { Header } from "@/components/Header";
import { TopBanner } from "@/components/TopBanner";
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
         <TopBanner />
         <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;