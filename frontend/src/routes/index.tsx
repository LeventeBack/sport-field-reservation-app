import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import useAuth from "../hooks/useAuthContext";
import { AdminProtectedRoute, UserProtectedRoute } from "./ProtectedRoutes";

import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard";
import MainLayout from "../components/MainLayout";
import Error404 from "../components/ErrorPage";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import SportFieldView from "../pages/sport-fields/View";
import SportFieldCreate from "../pages/sport-fields/Create";
import SportFieldEdit from "../pages/sport-fields/Edit";
import SportFieldList from "../pages/sport-fields/List";

import FieldTypeList from "../pages/field-types/List";

import ReservationList from "../pages/reservations/List";
import AdminReservationList from "../pages/reservations/AdminList";

import UserProfile from "../pages/users/View";
import UserList from "../pages/users/List";

const Routes = () => {
  const { user } = useAuth();

  const routesForAnyUser = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "sport-fields/:id",
      element: <SportFieldView />,
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ];

  const adminRoutes = [
    {
      path: "",
      element: <AdminDashboard />,
    },
    {
      path: "sport-fields",
      element: <SportFieldList />,
    },
    {
      path: "sport-fields/create",
      element: <SportFieldCreate />,
    },
    {
      path: "sport-fields/:id/edit",
      element: <SportFieldEdit />,
    },
    {
      path: "field-types",
      element: <FieldTypeList />,
    },
    {
      path: "users",
      element: <UserList />,
    },
    {
      path: "reservations",
      element: <AdminReservationList />,
    },
  ];

  const userRoutes = [
    {
      path: "profile",
      element: <UserProfile />,
    },
    {
      path: "reservations",
      element: <ReservationList />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "",
      element: <UserProtectedRoute />,
      children: [
        ...userRoutes,
        {
          path: "/admin",
          element: <AdminProtectedRoute />,
          children: [...adminRoutes],
        },
      ],
    },
  ];

  const errorPages = [
    {
      path: "*",
      element: <Error404 />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout children={<Outlet />} />,
      children: [
        ...routesForAnyUser,
        ...(!user ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
        ...errorPages,
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
