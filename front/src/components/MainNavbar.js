import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../static/styles/mainNavbar.css";

const MainNavbar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  let navigationTitle = "";
  const setNavigationTitle = function (pathname) {
    if (pathname.includes("/home") || pathname === "/") {
      navigationTitle = "Strona startowa";
    } else if (pathname.includes("/login")) {
      navigationTitle = "Logowanie";
    } else if (pathname.includes("/routes")) {
      navigationTitle = "Trasy";
    } else if (pathname.includes("/schools")) {
      navigationTitle = "Szkoły";
    } else if (pathname.includes("/concerts")) {
      navigationTitle = "Koncerty";
    } else if (pathname.includes("/teams")) {
      navigationTitle = "Zespoły";
    } else if (pathname.includes("/musicians")) {
      navigationTitle = "Pracownicy";
    } else if (pathname.includes("/maps")) {
      navigationTitle = "Mapy";
    } else if (pathname.includes("/users")) {
      navigationTitle = "Użytkownicy";
    } else {
      navigationTitle = "Błąd";
    }
  };
  setNavigationTitle(location.pathname);
  if (!user) {
    // No logged user
    return (
      <>
        <div className="d-flex justify-content-between main-nav">
          <Link to="/">
            <img
              className="logo"
              src={require("./../static/images/logo.png")}
              alt="logo"
            />
          </Link>
          <div className="sub-main-nav d-flex flex-column align-items-center">
            <div>{navigationTitle}</div>
            <div></div>
          </div>
          <Link to="/login" className="d-flex align-items-center">
            <button className="button-log-in">LOG IN</button>
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
          <div className="d-flex justify-content-between main-nav">
            <Link to="/">
              <img
                className="logo"
                src={require("./../static/images/logo.png")}
                alt="logo"
              />
            </Link>
            <div className="sub-main-nav d-flex flex-column align-items-center">
              <div>{navigationTitle}</div>
              <div className="d-flex flex-row justify-content-between">
                <Link
                  to="/routes"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname.includes("/routes")
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
                      location.pathname.includes("/schools")
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
                      location.pathname.includes("/concerts")
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
                      location.pathname.includes("/teams")
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
                      location.pathname.includes("/musicians")
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
                      location.pathname.includes("/maps")
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
              <div className="username-box">{user.username}</div>
            </div>
            <div className="d-flex align-items-center">
              <button className="button-log-out" onClick={handleLogout}>
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
          <div className="d-flex justify-content-between main-nav">
            <Link to="/">
              <img
                className="logo"
                src={require("./../static/images/logo.png")}
                alt="logo"
              />
            </Link>
            <div className="sub-main-nav d-flex flex-column align-items-center">
              <div>{navigationTitle}</div>
              <div className="d-flex flex-row justify-content-between">
                <Link
                  to="/routes"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <button
                    className={
                      location.pathname.includes("/routes")
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
                      location.pathname.includes("/schools")
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
                      location.pathname.includes("/concerts")
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
                      location.pathname.includes("/teams")
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
                      location.pathname.includes("/musicians")
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
                      location.pathname.includes("/maps")
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
                      location.pathname.includes("/users")
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
              <div className="username-box">{user.username}</div>
            </div>
            <div className="d-flex align-items-center">
              <button className="button-log-out" onClick={handleLogout}>
                LOG OUT
              </button>
            </div>
          </div>
        </>
      );
  }
};
export default MainNavbar;
