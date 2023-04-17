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
    case "/routes":
      navigationTitle = "Trasy";
      break;
    case "/schools":
      navigationTitle = "Szkoły";
      break;
    case "/concerts":
      navigationTitle = "Koncerty";
      break;
    case "/teams":
      navigationTitle = "Zespoły";
      break;
    case "/musicians":
      navigationTitle = "Pracownicy";
      break;
    case "/maps":
      navigationTitle = "Mapy";
      break;
    case "/users":
      navigationTitle = "Użytkownicy";
      break;
    default:
      navigationTitle = "Błąd";
    // console.log(location.pathname);
  }
  if (!user) {
    // No logged user
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
      Cookies.remove("admin_rights");
      setUser(null);
      navigate("/");
    };
    if (user.admin_rights === "0") {
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
              <div className="d-flex flex-row justify-content-between">
                <Link
                  to="/routes"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/routes"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">TRASY</span>
                  </button>
                </Link>
                <Link
                  to="/schools"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/schools"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">SZKOŁY</span>
                  </button>
                </Link>
                <Link
                  to="/concerts"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/concerts"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">KONCERTY</span>
                  </button>
                </Link>
                <Link
                  to="/teams"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/teams"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">ZESPOŁY</span>
                  </button>
                </Link>
                <Link
                  to="/musicians"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/musicians"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">PRACOWNICY</span>
                  </button>
                </Link>
                <Link
                  to="/maps"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/maps"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">MAPY</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="usernameBox">{user.username}</div>
            </div>
            <div className="d-flex align-items-center">
              <button className="button-logOut" onClick={handleLogout}>
                LOG OUT
              </button>
            </div>
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
              <div className="d-flex flex-row justify-content-between">
                <Link
                  to="/routes"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/routes"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">TRASY</span>
                  </button>
                </Link>
                <Link
                  to="/schools"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/schools"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">SZKOŁY</span>
                  </button>
                </Link>
                <Link
                  to="/concerts"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/concerts"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">KONCERTY</span>
                  </button>
                </Link>
                <Link
                  to="/teams"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/teams"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">ZESPOŁY</span>
                  </button>
                </Link>
                <Link
                  to="/musicians"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/musicians"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">PRACOWNICY</span>
                  </button>
                </Link>
                <Link
                  to="/maps"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/maps"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">MAPY</span>
                  </button>
                </Link>
                <Link
                  to="/users"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname === "/users"
                        ? "button-nav-active"
                        : "button-nav"
                    }
                  >
                    <span className="text">UŻYTKOWNICY</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="usernameBox">{user.username}</div>
            </div>
            <div className="d-flex align-items-center">
              <button className="button-logOut" onClick={handleLogout}>
                LOG OUT
              </button>
            </div>
          </div>
        </>
      );
  }
};
export default MainNavbar;
