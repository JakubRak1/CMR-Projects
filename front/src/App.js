import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Logged from "./pages/Logged";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login section</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        {/* Dashbord */}
        <Route path="/" element={<Home user={user}></Home>} />
        <Route path="/loged" element={<Logged user={user}></Logged>} />
        <Route path="/login" element={<Login setUser={setUser}> </Login>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
