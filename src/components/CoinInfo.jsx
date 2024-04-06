import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function reduceCurrency(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue)).toFixed(2);
}

const CoinInfo = ({
  image,
  name,
  symbol,
  price,
  volume,
  market,
  handleClick,
}) => {
  return (
    <tr
      className="table-row"
      onClick={(e) => handleClick({ symbol: symbol, market: market })}
    >
      <td>
        <img
          className="icons"
          src={`https://www.cryptocompare.com${image}`}
          alt={`Small icon for ${name} crypto coin`}
        />
      </td>
      <td>{name}</td>
      <td>{symbol}</td>
      <td>{"$" + reduceCurrency(price)}</td>
      <td>{"$" + reduceCurrency(volume)}</td>
      <td>
        <Link
          style={{ color: "White" }}
          to={`/coinDetails/${symbol}`}
          key={symbol}
        >
          🔗
        </Link>
      </td>
    </tr>
  );
};

export default CoinInfo;

// API call to get price of a coin
//------------------------------------------
// const [price, setPrice] = useState(null);
// useEffect(() => {
//   const getCoinPrice = async () => {
//     const response = await fetch(
//       `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
//         API_KEY
//     );

//     const json = await response.json();
//     setPrice(json);
//   };
//   getCoinPrice().catch(console.error);
// }, [symbol]);
