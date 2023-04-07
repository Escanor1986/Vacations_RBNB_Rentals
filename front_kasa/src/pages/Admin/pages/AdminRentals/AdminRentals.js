import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AdminRentalsNav from "./components/AdminRentalsNav/AdminRentalsNav";

function AdminRentals() {
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des locations</h4>
      <div className="flex-fill d-flex flex-column">
        <AdminRentalsNav />
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminRentals;
