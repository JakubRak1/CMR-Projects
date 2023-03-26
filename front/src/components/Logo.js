const Logo = () => {
  return (
    <div className="d-flex justify-content-between">
      <img
        src={require("./../images/logo.png")}
        alt="logo"
        style={{ width: "800px", height: "500px;" }}
      />
    </div>
  );
};
export default Logo;
