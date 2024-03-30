import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol, price, volume }) => {
  return (
    <tr>
      <td>
        <img
          className="icons"
          src={`https://www.cryptocompare.com${image}`}
          alt={`Small icon for ${name} crypto coin`}
        />
      </td>
      <td>{name}</td>
      <td>{symbol}</td>
      <td>{price}</td>
      <td>{volume}</td>
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
