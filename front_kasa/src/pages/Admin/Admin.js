import { Outlet } from "react-router-dom";
import AdminNav from "./components/AdminNav/AdminNav";

function Admin() {
  return (
    <div className="d-flex flex-fill align-items-center justify-content-center p-20">
      <AdminNav />
      <Outlet />
    </div>
  );
}

export default Admin;
