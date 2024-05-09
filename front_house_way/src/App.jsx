import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      {/* On intègre le Suspense dans une div pour éviter le jump du footer lors du reload */}
      <div className="flex-fill d-flex flex-column">
        {/* Suspense est utilisé pour retarder le rendu de la page jusqu'à ce que tous les 
        composants nécessaires soient chargés */}
        <Suspense fallback={<div>Loading...</div>}>
          {/* Outlet permet de rendre dynamiquement des composants selon le
          chemin de l'URL actuelle */}
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
export default App;
