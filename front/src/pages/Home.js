import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();
  if (user) {
    const handleLogout = async (e) => {
      e.preventDefault();
      Cookies.remove("user");
      setUser(null);
      navigate("/home");
    };
    return (
      <>
        <Link to="/dashboard">Dashboard</Link>
        <button className="#" onClick={handleLogout}>
          Logout
        </button>
        <div>
          Home Page
          <h1>Hello {user.username} lets get to work</h1>
        </div>
      </>
    );
  } else
    return (
      <>
        <Link to="/login">Login</Link>
        <div>
          Home Page
          <h1> Please login to start your work</h1>
        </div>
      </>
    );
};
export default Home;
