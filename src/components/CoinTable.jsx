import React from "react";
import CoinInfo from "./CoinInfo";

const CoinTable = ({ list, filteredData, changeChart }) => {
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
            <th>Details</th>
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
                price={list[coin].RAW.USD.PRICE}
                volume={list[coin].RAW.USD.TOPTIERVOLUME24HOURTO}
                market={list[coin].DISPLAY.USD.MARKET}
                handleClick={changeChart}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
