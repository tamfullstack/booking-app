import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import DashboardPage from "./pages/DashboardPage";
import HotelsPage from "./pages/HotelsPage";
import RoomsPage from "./pages/RoomsPage";
import TransactionsPage from "./pages/TransactionsPage";
import NewHotelPage from "./pages/NewHotelPage";
import NewRoomPage from "./pages/NewRoomPage";
import LoginPage from "./pages/LoginPage";
import { loginAction } from "./components/Login/Login";
import { adminUserLoader } from "./components/Layout/Layout";
import { logoutAction } from "./components/Layout/Navbar/Navbar";
import { dashboardLoader } from "./components/Dashboard/Dashboard";
import { transactionsLoader } from "./components/Transactions/Transactions";
import EditHotelPage from "./pages/EditHotelPage";
import { updateHotelAction } from "./components/Layout/HotelForm/HotelForm";
import { updateRoomAction } from "./components/Layout/RoomForm/RoomForm";
import EditRoomPage from "./pages/EditRoomPage";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    loader: adminUserLoader,
    children: [
      { index: true, element: <DashboardPage />, loader: dashboardLoader },
      { path: "hotels", element: <HotelsPage /> },
      { path: "rooms", element: <RoomsPage /> },
      {
        path: "transactions",
        element: <TransactionsPage />,
        loader: transactionsLoader,
      },
      {
        path: "new-hotel",
        element: <NewHotelPage />,
        action: updateHotelAction,
      },
      {
        path: "edit-hotel/:hotelId",
        element: <EditHotelPage />,
        action: updateHotelAction,
      },
      { path: "new-room", element: <NewRoomPage />, action: updateRoomAction },
      {
        path: "edit-room/:roomId",
        element: <EditRoomPage />,
        action: updateRoomAction,
      },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
