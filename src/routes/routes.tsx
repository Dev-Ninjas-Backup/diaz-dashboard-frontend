import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddListing from "../pages/AddListing";
import AnalyticsAndReports from "../pages/AnalyticsAndReports";
import ContentManagement from "../pages/ContentManagement";
import DailyLeads from "../pages/DailyLeads";
import FeaturedAndHomeManagement from "../pages/Featured&HomeManagement";
import ListingManagement from "../pages/ListingManagement";
import Overview from "../pages/Overview";
import SellerManagement from "../pages/SellerManagement";
import Settings from "../pages/Settings";
import UsersAndPermission from "../pages/UsersAndPermission";
import LoginPage from "../pages/login/Login";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/admin-login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Overview /> },
          { path: "overview", element: <Overview /> },
          { path: "listings", element: <ListingManagement /> },
          { path: "listings/add", element: <AddListing /> },
          { path: "sellers", element: <SellerManagement /> },
          { path: "daily-leads", element: <DailyLeads /> },
          { path: "featured", element: <FeaturedAndHomeManagement /> },
          { path: "content", element: <ContentManagement /> },
          { path: "users", element: <UsersAndPermission /> },
          { path: "analytics", element: <AnalyticsAndReports /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

export default router;
