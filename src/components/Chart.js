import React, { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import nyc from "../assets/data/chart-data/nyc.js";
import sf from "../assets/data/chart-data/sf.js";
import am from "../assets/data/chart-data/am.js";
import BarChart from "./BarChart.js";

import "../assets/styles/components/Chart.css";

const Chart = (props) => {
  const { waipointId } = props;
  // const { texts } = this.props;
  const [temps, setTemps] = useState({});
  const [city, setCity] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [waipoint, setWaipoint] = useState(waipointId);
  useEffect(() => {
    if (waipointId >= 0 && waipointId < cities.length) setCity(cities[waipointId]);
  }, [waipointId]);
  useEffect(() => {
    sf.forEach((day) => (day.date = new Date(day.date)));
    nyc.forEach((day) => (day.date = new Date(day.date)));
    am.forEach((day) => (day.date = new Date(day.date)));
    setTemps({ sf, nyc, am });
    window.addEventListener("resize", onResize, false);
    onResize();
  }, []);

  const cities = ["", "nyc", "sf", "am"];
  const cityNames = {
    nyc: "New York City",
    sf: "San Francisco",
    am: "Amsterdam",
    "": "",
  };
  const cityNames2 = {
    nyc: "New York City",
    sf: "San Francisco",
    am: "Amsterdam",
    "": "",
  };

  const onResize = () => {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    if (screenWidth > 768) {
      screenWidth = screenWidth * 0.42;
    } else {
      screenWidth = screenWidth * 0.9;
    }
    setScreenWidth(screenWidth);
    setScreenHeight(screenHeight);
  };

  const onStepEnter = (city, { currentPosition, previousPosition }) => {
    setCity({ city });
  };

  const onStepExit = (city, { currentPosition, previousPosition }) => {
    if (city === "nyc" && currentPosition === "below") {
      setCity("nyc");
    }

    const el = document.querySelector(`#waypoint-${city}`);
  };

  return (
    <>
      <BarChart
        width={screenWidth}
        height={screenHeight}
        data={city ? temps[city] : {}}
      />
      <p className="Chart__title">
        Mobile phone activity:{" "}
        <span
          style={{
            color: "#1aa3ff",
            padding: "3px",
            borderRadius: "2px",
          }}
        >
          {cityNames2[city]}
        </span>
      </p>
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default Chart;
