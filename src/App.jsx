import { useState, useEffect } from "react";
import Header from "./components/Header";
import CoinTable from "./components/CoinTable";
import Card from "./components/Card";
import CoinChart from "./components/CoinChart";
import "./App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  // contains the top 10 coins
  const [list, setList] = useState(null);
  // use filter techniques to filter list
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [totalVol, setTotalVol] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);
  const [numCoins, setNumCoins] = useState(0);
  const [coinChart, setCoinChart] = useState({
    symbol: "",
    market: "",
  });

  const resetFiltered = () => {
    let filtered = [];
    for (let i = 0; i < list.length; i++) {
      filtered.push(i);
    }
    setFilteredResults(filtered);
  };

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD&api_key=${API_KEY}`
      );
      const json = await response.json();
      // set list
      setList(json.Data);
      setCoinChart({
        symbol: json.Data[0].CoinInfo.Internal,
        market: json.Data[0].DISPLAY.USD.MARKET,
      });

      // set filtered list
      let filtered = [];
      for (let i = 0; i < json.Data.length; i++) {
        filtered.push(i);
      }
      setFilteredResults(filtered);

      // set total volume
      let totVol = 0;
      for (let i = 0; i < json.Data.length; i++) {
        totVol += json.Data[i].RAW.USD.TOPTIERVOLUME24HOURTO;
      }
      setTotalVol(totVol);

      // set highest price
      let maxPrice = 0;
      for (let i = 0; i < json.Data.length; i++) {
        if (maxPrice < json.Data[i].RAW.USD.PRICE) {
          maxPrice = json.Data[i].RAW.USD.PRICE;
        }
      }
      setHighestPrice(maxPrice);
      setNumCoins(json.Data.length);
    };
    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue === "") {
      resetFiltered();
    }
    let filteredData = [];

    // fuzzy search filter
    for (let i = 0; i < list.length; i++) {
      let coin = list[i].CoinInfo;
      let coinValues = (coin.Id + coin.Name + coin.FullName).toLowerCase();
      if (coinValues.includes(searchValue.toLowerCase())) {
        filteredData.push(i);
      }
    }
    setFilteredResults(filteredData);
  };

  const filterMaxPrice = () => {};

  return (
    <>
      <Header
        handleChange={(inputString) => searchItems(inputString.target.value)}
      />
      <div className="data-container">
        <div className="summary-data-container">
          <Card
            name={"Total Volume"}
            stat={"$" + reduceCurrency(Math.floor(totalVol))}
          />
          <Card
            name={"Highest Price"}
            stat={"$" + reduceCurrency(Math.floor(highestPrice))}
          />
          <Card name={"Number of Coins"} stat={numCoins} />
        </div>
        <div className="listchart-container">
          <CoinTable
            list={list}
            filteredData={filteredResults}
            changeChart={setCoinChart}
          />
          <CoinChart symbol={coinChart.symbol} market={coinChart.market} />
        </div>
      </div>
    </>
  );
}

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

export default App;
