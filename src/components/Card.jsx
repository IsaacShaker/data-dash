import React from "react";

const Card = ({ name, stat }) => {
  return (
    <div className="card">
      <h2>{stat}</h2>
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
