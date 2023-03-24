import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";

const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const Apropos = lazy(() => import("./pages/APropos/APropos"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const FicheLogement = lazy(() => import("./pages/FicheLogement/FicheLogement"));
const AdminRentals = lazy(() =>
  import("./pages/Admin/pages/AdminRentals/AdminRentals")
);
const AdminRentalsList = lazy(() =>
  import(
    "./pages/Admin/pages/AdminRentals/pages/AdminRentalsList/AdminRentalsList"
  )
);
const AdminRentalsForm = lazy(() =>
  import(
    "./pages/Admin/pages/AdminRentals/pages/AdminRentalsForm/AdminRentalsForm"
  )
);
const AdminUsers = lazy(() =>
  import("./pages/Admin/pages/AdminUsers/AdminUsers")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "fiche",
        element: <FicheLogement />,
      },
      {
        path: "apropos",
        element: <Apropos />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
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
                path: "form",
                element: <AdminRentalsForm />,
              },
              {
                path: "edit/:rentalId",
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
