import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "./layout/layout";
import ProtectedRoute from "./auth/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageResturantPage from "./pages/ManageResturantPage";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import OrderStatusPage from "./pages/OrderStatusPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "auth-callback",
          element: (
            <ProtectedRoute>
              <AuthCallbackPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "order-status",
          element: (
            <ProtectedRoute>
              <OrderStatusPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user-profile",
          element: (
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "manage-restaurant",
          element: (
            <ProtectedRoute>
              <ManageResturantPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "search/:city",
          element: <SearchPage />,
        },
        {
          path: "details/:restaurantId",
          element: <DetailsPage />,
        },
        { path: "test", element: <Button>Hewllo</Button> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
