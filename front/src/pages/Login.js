import { useState, useEffect, useRef } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import api from "../api/login";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import "../static/styles/login.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const URL_LOGIN = "/login";

const Login = ({ setUser }) => {
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [focusUsername, setFocusUsername] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Testing valid username whenever username is changed
  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  // Testing valid password whenever password is changed
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);
  // Clearing err msg
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const loginData = { username: username, password: hashedPassword };
    try {
      const response = await api.post(URL_LOGIN, loginData);
      if (response.status === 200) {
        setUser({
          username: response.data.user.username,
          admin_rights: String(response.data.user.admin_rights),
        });
        Cookies.set("user", response.data.user.username, { expires: 30 });
        Cookies.set("admin_rights", response.data.user.admin_rights, {
          expires: 30,
        });
        setSuccess(true);
      }
    } catch (err) {
      if (err.response) {
        setErrMsg("Zła nazwa użytkownika lub hasła");
      } else if (err.request) {
        setErrMsg("Bład połączenia, spróbuj ponownie za jakiś czas");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section className="d-flex flex-column">
          <span>Zalogowano</span>
          <Link to="/"> Zabierz mnie do głównej strony</Link>
        </section>
      ) : (
        <section>
          <div className="d-flex justify-content-center">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "hidden"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </div>
          <form
            className="d-flex flex-column align-items-center justify-content-center text-1vw"
            onSubmit={handleLogin}
          >
            <label className="text-center" htmlFor="username">
              Nazwa użytkownika :
              <span className={validUsername ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validUsername || !username ? "hidden" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="username"
              ref={usernameRef}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-invalid={validUsername ? "false" : "true"}
              onFocus={() => setFocusUsername(true)}
              onBlur={() => setFocusUsername(false)}
            />
            <label className="text-center" htmlFor="password">
              Hasło :
              <span className={validPassword ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validPassword || !password ? "hidden" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              className="form-control mt-2"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validPassword ? "false" : "true"}
              onFocus={() => setFocusPassword(true)}
              onBlur={() => setFocusPassword(false)}
            />
            <button
              className="btn btn-primary mt-3 mb-2 p-3"
              id="submitBtn"
              disabled={!validUsername || !validPassword ? true : false}
            >
              Zaloguj
            </button>
            <Link to="/" className="text-decoration-none text-primary">
              Zabierz mnie z powrotem na główną stronę
            </Link>
          </form>
        </section>
      )}
    </>
  );
};
export default Login;
