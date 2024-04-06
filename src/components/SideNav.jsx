import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="sidenav">
      <h1 className="yellow">Crypt</h1>
      <h3>
        <Link style={{ color: "White" }} to={"/"}>
          Dashboard
        </Link>
      </h3>
      <h3>Search</h3>
      <h3>About</h3>
    </div>
  );
};

export default SideNav;
