import React from "react";
import CoinInfo from "./CoinInfo";

const CoinTable = ({ list, filteredData }) => {
  return (
    <div className="coins-container">
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            filteredData &&
            filteredData.map((coin) => (
              <CoinInfo
                image={list[coin].CoinInfo.ImageUrl}
                name={list[coin].CoinInfo.FullName}
                symbol={list[coin].CoinInfo.Internal}
                price={list[coin].DISPLAY.USD.PRICE}
                volume={list[coin].DISPLAY.USD.TOPTIERVOLUME24HOURTO}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
