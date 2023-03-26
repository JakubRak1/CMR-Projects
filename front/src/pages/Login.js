import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/login";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const loginData = { username: username, password: hashedPassword };
    console.log(loginData);
    try {
      const response = await api.post("/login", loginData);
      if (response.status === 200) {
        setUser({ username: username });
        Cookies.set("user", { username: username }, { expires: 30 });
        navigate("/loged");
      }
    } catch (err) {
      navigate("/loged");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <Link to="/">Get back to main page</Link>
    </div>
  );
};
export default Login;
