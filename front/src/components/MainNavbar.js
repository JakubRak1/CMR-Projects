import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../static/styles/mainNavbar.css";

const MainNavbar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  let navigationTitle = "";
  switch (location.pathname) {
    case "/":
      navigationTitle = "Strona startowa";
      break;
    case "/home":
      navigationTitle = "Strona startowa";
      break;
    case "/login":
      navigationTitle = "Logowanie";
      break;
    case "/loged":
      navigationTitle = "Logowanie";
      break;
    default:
      navigationTitle = "Błąd";
      console.log(location.pathname);
  }
  // No logged user
  if (!user) {
    return (
      <>
        <div className="d-flex justify-content-between mainnav">
          <Link to="/">
            <img
              className="logo"
              src={require("./../static/images/logo.png")}
              alt="logo"
            />
          </Link>
          <div className="subMainNav d-flex flex-column align-items-center">
            <div>{navigationTitle}</div>
            <div></div>
          </div>
          <Link to="/login" className="d-flex align-items-center">
            <button className="button-logIn">LOG IN</button>
          </Link>
        </div>
      </>
    );
    // User logged
  } else {
    const handleLogout = async (e) => {
      e.preventDefault();
      Cookies.remove("user");
      setUser(null);
      navigate("/");
    };
    if (user.admin_rights === 0) {
      return (
        <>
          <div className="d-flex justify-content-between mainnav">
            <Link to="/">
              <img
                className="logo"
                src={require("./../static/images/logo.png")}
                alt="logo"
              />
            </Link>
            <div className="subMainNav d-flex flex-column align-items-center">
              <div>{navigationTitle}</div>
              {/* To fill links */}
              <div> tu beda inne linki</div>
            </div>
            {/* Stylizing!! */}
            <div>{user.username}</div>
            <button className="button-logOut" onClick={handleLogout}>
              LOG OUT
            </button>
          </div>
        </>
      );
      // Admin logged
    } else
      return (
        <>
          <div className="d-flex justify-content-between mainnav">
            <Link to="/">
              <img
                className="logo"
                src={require("./../static/images/logo.png")}
                alt="logo"
              />
            </Link>
            <div className="subMainNav d-flex flex-column align-items-center">
              <div>{navigationTitle}</div>
              {/* To fill links */}
              <div> tu beda inne linki dla admina</div>
            </div>
            {/* Stylizing!! */}
            <div>{user.username}</div>
            <button className="button-logOut" onClick={handleLogout}>
              LOG OUT
            </button>
          </div>
        </>
      );
  }
};
export default MainNavbar;
