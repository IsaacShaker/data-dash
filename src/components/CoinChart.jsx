import React, { Component, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinChart = ({ symbol, market }) => {
  const [histData, setHistData] = useState(null);

  useEffect(() => {
    const getCoinHist = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=` +
          API_KEY
      );

      const json = await response.json();
      setHistData(json.Data.Data);
    };
    getCoinHist().catch(console.error);
  }, [market, symbol]);

  const cleanData = (data) => {
    let filteredData = [];
    let countDays = 0;
    for (const item of data) {
      let accurateTime = new Date(item.time).toLocaleTimeString("en-US");
      let accurateDay = new Date();
      accurateDay.setDate(accurateDay.getDate() - countDays);
      let dateString = accurateDay.toLocaleDateString("en-US").split("/");

      filteredData.push({
        time: dateString[0] + "/" + dateString[1], //+ " " + accurateTime,
        Price: item.open,
      });
      countDays++;
    }

    // data is given counting backwards, so return the reverse to have data ordered from oldest to newest for accurate plotting
    return filteredData.reverse();
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      {histData ? ( // rendering only if API call actually returned us data
        <div>
          <br></br>
          <h2>30-Day Price Data for {symbol}</h2>

          <LineChart
            width={1000}
            height={300}
            data={cleanData(histData)}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <Line
              type="monotone"
              dataKey="Price"
              stroke="#8884d8"
              activeDot={{ r: 5 }}
            />
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="time" interval={2} angle={0} dx={0}>
              <Label
                value="Date and Time"
                offset={0}
                position="indideBottom"
                dy={20}
              />
            </XAxis>

            <YAxis
              dataKey="Price"
              label={{
                value: "Price",
                angle: -90,
                position: "outsideLeft",
                textAnchor: "middle",
                dx: -40,
              }}
            />
            <Tooltip />
          </LineChart>
        </div>
      ) : null}
    </div>
  );
};

export default CoinChart;