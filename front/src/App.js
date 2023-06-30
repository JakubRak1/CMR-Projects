import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Maps from "./pages/Maps"
import MapsKey from "./api/mapAPIKey"
import Error from "./pages/Error";
import Schools from "./pages/Schools";
import Teams from "./pages/Teams";
import Employees from "./pages/Employees";
import Users from "./pages/Users";
import CookiesMessage from "./components/CookiesMessage";
import MainNavbar from "./components/MainNavbar";
import "./static/styles/mainStyles.css";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUserUsername = Cookies.get("user");
    const savedUserRights = Cookies.get("admin_rights");
    if (savedUserUsername && savedUserRights) {
      const savedUser = {
        username: savedUserUsername,
        admin_rights: savedUserRights,
      };
      setUser(savedUser);
    }
  }, []);
  return (
    <>
      <MainNavbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" />
        <Route path="/home" />
        <Route
          path="/login"
          element={<Login setUser={setUser} user={user} />}
        />
        <Route path="/routes" element={<div>Trasy do robienia</div>} />
        <Route path="/schools" element={<Schools user={user} />} />
        <Route path="/schools/*" element={<Schools user={user} />} />
        <Route path="/concerts" element={<div>Kocerty do robienia</div>} />
        <Route path="/teams" element={<Teams user={user} />} />
        <Route path="/teams/*" element={<Teams user={user} />} />
        <Route path="/employees" element={<Employees user={user} />} />
        <Route path="/employees/*" element={<Employees user={user} />} />
        <Route path="/maps" element={<Maps apiKey={MapsKey} />} />
        <Route path="/users" element={<Users user={user} />} />
        <Route path="/users/*" element={<Users user={user} />} />
        {/* To fix error page */}
        <Route path="*" element={<Error />} />
      </Routes>
      <CookiesMessage />
    </>
  );
}

export default App;
