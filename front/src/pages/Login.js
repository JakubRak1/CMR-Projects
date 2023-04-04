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
    try {
      const response = await api.post("/login", loginData);
      if (response.status === 200) {
        setUser({
          username: response.data.user.username,
          admin_rights: response.data.user.admin_rights,
        });
        Cookies.set(
          "user",
          {
            username: response.data.user.username,
            admin_rights: response.data.user.admin_rights,
          },
          { expires: 30 }
        );
        navigate("/loged");
      }
    } catch (err) {
      if (err.response) {
        console.log("Złe haslo");
      } else if (err.request) {
        console.log(err.request.status);
        console.log("cos jest nie tak z serwerem");
      }
      navigate("/loged");
    }
  };
  // Stylizing
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Nazwa użytkownika:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Hasło:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Zaloguj</button>
      </form>
      <Link to="/">Zabierz mnie z powrotem na główną stronę</Link>
    </div>
  );
};
export default Login;
