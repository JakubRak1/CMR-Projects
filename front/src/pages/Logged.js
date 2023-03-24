import { Link } from "react-router-dom";

const Logged = ({ user }) => {
  if (user.correct) {
    return (
      <>
        <div>Logged!!</div>
        <Link to="/">Get back to home page</Link>
      </>
    );
  } else {
    return (
      <>
        <div>Wrong username or password</div>
        <Link to="/">Get back to main page</Link>
        <Link to="/login">Try loggin again</Link>
      </>
    );
  }
};
export default Logged;
