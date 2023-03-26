import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Logged from "./pages/Logged";
import Logo from "./components/Logo";
import CookiesMessage from "./components/CookiesMessage";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);
  return (
    <>
      <Logo></Logo>
      <Routes>
        <Route
          path="/home"
          element={<Home user={user} setUser={setUser}></Home>}
        />
        <Route path="/" element={<Home user={user} setUser={setUser}></Home>} />
        <Route path="/loged" element={<Logged user={user}></Logged>} />
        <Route path="/login" element={<Login setUser={setUser}> </Login>} />
        <Route path="*" element={<Error />} />
      </Routes>
      <CookiesMessage />
    </>
  );
}

export default App;
