import React from "react";

const Header = ({ handleChange }) => {
  return (
    <div className="header">
      <h2>Dashboard</h2>
      <input
        className="searchbar"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
      />
      <input
        className="searchbar"
        type="text"
        placeholder="Max Price..."
        onChange={handleChange}
      />
    </div>
  );
};

export default Header;
