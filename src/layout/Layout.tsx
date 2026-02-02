import Navbar from '@/components/shared/Navbar';
import UpperNavbar from '@/components/shared/UpperNavbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex h-full">
      <Navbar />

      <main className="flex-1 lg:ml-[310px] xl:ml-80 transition-all duration-300">
        <UpperNavbar />
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
