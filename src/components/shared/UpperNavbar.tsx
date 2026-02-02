import { NotificationBell } from '@/components/shared/NotificationBell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';

const UpperNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white p-1">
      <div className="md:ml-0 ml-10 flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, sellers, or content..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Right Section - Notification & User */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification Bell */}
          <div className="cursor-pointer">
            <NotificationBell />
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-gray-200">
              <AvatarImage src="" alt="Admin User" />
              <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
                AU
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                Admin User
              </p>
              <p className="text-xs text-gray-500 leading-tight">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UpperNavbar;
