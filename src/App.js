import { useSelector } from "react-redux";
import "admin-lte/dist/css/adminlte.css";
import "admin-lte/dist/js/adminlte.js";
import { WebApp } from "./routes/web";
import { AdminApp } from "./routes/admin";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./Loading.css";
function App() {
  const isAdmin = useSelector((state) => state.auth.auth.user);
  const renderApp = () => {
    if (isAdmin && isAdmin.level === "admin") {
      return (
        <>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/*" element={<WebApp />} />
          </Routes>
        </>
      );
    } else {
      return (
        <>
          <Routes>
            <Route path="/*" element={<WebApp />} />
          </Routes>
        </>
      );
    }
  };

  return <>{renderApp()}</>;
}

export default App;
