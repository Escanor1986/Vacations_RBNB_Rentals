import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AdminNav from "./components/AdminNav/AdminNav";

function Admin() {
  return (
    <div className="d-flex flex-fill p-20">
      <AdminNav />
      {/* On intègre le Suspense dans une div pour éviter le jump du footer lors du reload */}
      <div className="d-flex flex-column flex-fill">
        {/* Suspense est utilisé pour retarder le rendu de la page jusqu'à ce que tous les 
        composants nécessaires soient chargés */}
        <Suspense>
          {/* Outlet permet de rendre dynamiquement des composants selon le
          chemin de l'URL actuelle */}
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default Admin;
