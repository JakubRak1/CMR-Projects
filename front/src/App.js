import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Schools from "./pages/Schools";
import Employees from "./pages/Employees";
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
        <Route path="/teams" element={<div>Zespoły do robienia</div>} />
        <Route path="/employees" element={<Employees user={user} />} />
        <Route path="/employees/*" element={<Employees user={user} />} />
        <Route path="/maps" element={<div>Mapy do robienia</div>} />
        <Route path="/users" element={<div>Użytkownicy do robienia</div>} />
        {/* To fix error page */}
        <Route path="*" element={<Error />} />
      </Routes>
      <CookiesMessage />
    </>
  );
}

export default App;
