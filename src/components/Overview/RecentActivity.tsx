import { LuCircleCheckBig, LuShip, LuStar, LuUserCheck } from 'react-icons/lu';

interface ActivityMeta {
  boatId: string;
  listingId?: string;
}

interface Activity {
  type: string;
  title: string;
  description: string;
  createdAt: string;
  meta: ActivityMeta;
}

interface RecentActivityProps {
  recentActivityData: Activity[];
}

const RecentActivity = ({ recentActivityData }: RecentActivityProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'boat_submitted':
        return <LuShip className="h-6 w-6 text-[#006EF0]" />;
      case 'listing_approved':
        return <LuCircleCheckBig className="h-6 w-6 text-[#006EF0]" />;
      case 'seller_verified':
        return <LuUserCheck className="h-6 w-6 text-[#006EF0]" />;
      case 'banner_uploaded':
        return <LuStar className="h-6 w-6 text-[#006EF0]" />;
      default:
        return <LuShip className="h-6 w-6 text-[#006EF0]" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 shadow flex flex-col">
      <div className="flex items-center gap-10 justify-between">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <p className="text-sm cursor-pointer hover:text-blue-600">View All</p>
      </div>
      <ul className="my-10 space-y-3 flex-1 overflow-y-auto">
        {recentActivityData && recentActivityData.length > 0 ? (
          recentActivityData.map((activity, index) => (
            <li
              key={index}
              className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg"
            >
              <div className="bg-[#006EF01A] p-3 rounded-full">
                {getIcon(activity.type)}
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium"> {activity.title}</p>
                <p className="text-xs text-gray-500"> {activity.description}</p>
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(activity.createdAt)}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li className="flex items-center justify-center p-8 text-gray-400">
            No recent activity
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
