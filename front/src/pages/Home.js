const Home = ({ user }) => {
  if (user) {
    return (
      <div>
        Home Page
        <h1>Hello {user.username} lets get to work</h1>
      </div>
    );
  } else
    return (
      <div>
        Home Page
        <h1> Please login to start your work</h1>
      </div>
    );
};
export default Home;
