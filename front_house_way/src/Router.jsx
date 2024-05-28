/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createHashRouter, redirect } from "react-router-dom";
import App from "./App";
import { getRental } from "./apis";
import WishList from "./pages/WishList/WishList";
import SignupPage from "./pages/SignUp/SignUp";
import RouteGuard from "./RouteGuard";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const FicheLogement = lazy(() => import("./pages/FicheLogement/FicheLogement"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Apropos = lazy(() => import("./pages/APropos/APropos"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const AdminRentals = lazy(() => import("./pages/Admin/pages/AdminRentals/AdminRentals"));
const AdminUsers = lazy(() => import("./pages/Admin/pages/AdminUsers/AdminUsers"));
const AdminRentalsList = lazy(() => import("./pages/Admin/pages/AdminRentals/pages/AdminRentalsList/AdminRentalsList"));
const AdminRentalsForm = lazy(() => import("./pages/Admin/pages/AdminRentals/pages/AdminRentalsForm/AdminRentalsForm"));

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: async () => redirect("/home"),
      },
      {
        path: "home",
        element: <RouteGuard requiresAuth={true} />,
        children: [
          {
            index: true,
            element: <Homepage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "apropos",
        element: <Apropos />,
      },
      {
        path: "wishlist",
        element: <RouteGuard requiresAuth={true} />,
        children: [
          {
            index: true,
            element: <WishList />,
          },
        ],
      },
      {
        path: "fiche/:id",
        loader: async ({ params: { id } }) => getRental(id),
        element: <FicheLogement />,
      },
      {
        path: "admin",
        element: <RouteGuard requiresAuth={true} />,
        children: [
          {
            path: "",
            element: <Admin />,
          },
          {
            path: "rentals",
            element: <AdminRentals />,
            children: [
              {
                index: true,
                loader: async () => redirect("/admin/rentals/list"),
              },
              {
                path: "list",
                element: <AdminRentalsList />,
              },
              {
                path: "new",
                element: <AdminRentalsForm />,
              },
              {
                path: "edit/:rentalId",
                loader: async ({ params: { rentalId } }) => getRental(rentalId),
                element: <AdminRentalsForm />,
              },
            ],
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            index: true,
            loader: async () => redirect("/admin/rentals"),
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
