import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/customer/HomePage";
import RoomsPage from "../pages/customer/RoomsPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import KiostPage from "../pages/kiosk/KioskPage";
import CustomerLayout from "../layouts/CustomerLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "rooms",
        element: <RoomsPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboardPage />,
  },
  {
    path: "kiosk",
    element: <KiostPage />,
  },
]);

export default router;