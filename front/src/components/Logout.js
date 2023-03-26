import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const user = Cookies.get("user");
  if (user) {
    Cookies.remove("user");
    navigate("/");
  }
  navigate("/");
};
export default Logout;
