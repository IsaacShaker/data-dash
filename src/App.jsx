import { useState, useEffect } from "react";
import SideNav from "./components/SideNav";
import Header from "./components/Header";
import CoinTable from "./components/CoinTable";
import Card from "./components/Card";
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
    <div className="App">
      <SideNav />
      <div className="rest-of-page">
        <Header
          handleChange={(inputString) => searchItems(inputString.target.value)}
        />
        <div className="data-container">
          <div className="summary-data-container">
            <Card name={"Total Volume"} stat={Math.floor(totalVol)} />
            <Card name={"Highest Price"} stat={Math.floor(highestPrice)} />
            <Card name={"Number of Coins"} stat={numCoins} />
          </div>
          <CoinTable list={list} filteredData={filteredResults} />
        </div>
      </div>
    </div>
  );
}

export default App;
