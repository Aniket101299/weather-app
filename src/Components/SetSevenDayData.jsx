import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOnclick } from "../redux/actions/actions";
import "./SetSevenDayData.css";

import rain from "../images/rain.png";
import mist from "../images/mist.png";
import cloud from "../images/clouds.png";
import clear from "../images/clear.png";
import haze from "../images/haze.png";

export default function SetSevenDayData() {
  const dispatch = useDispatch();

  const [colour, setColour] = useState("white");
  const [state, setState] = useState(false);

  const sevenData = useSelector((state) => state.sevenDayData.sevenDayData);
  const clickRise = useSelector((state) => state.sunriseData.sunriseData);
  const clickSet = useSelector((state) => state.sunsetData.sunsetData);
  const allSeven = useSelector((state) => state.allSevenData.allSevenData);

  // const click = useSelector((state) => state.onclickData.onclickData.clicked);

  console.log("reduxData", sevenData);

  const setData = (index, currentDayTemp, weather) => {
    let rise = clickRise[index];
    let set = clickSet[index];
    let pressure = allSeven[index].pressure;
    let humidity = allSeven[index].humidity;
    console.log("index", index);
    dispatch(
      setOnclick({
        rise: rise,
        set: set,
        pressure: pressure,
        humidity: humidity,
        currentDayTemp: currentDayTemp,
        weather: weather,
        clicked: true,
      })
    );
    setState(!state);
    // state == true ? setColour("gray") : setColour("white");
  };

  return (
    <>
      {sevenData.map((day, i) => {
        const { name, minTemp, maxTemp, weather, currentDayTemp } = day;

        // (clicked && clicked == true) ? {backgroundColor:"blue"} :
        // style={{backgroundColor: "gray"}}

        return (
          <div
            className={`${state}${i}`}
            key={i}
            onClick={() => setData(i, currentDayTemp, weather)}
          >
            <p>{name}</p>
            <span>{minTemp}</span>
            <span>{maxTemp}</span>
            <img
              src={
                weather == "Clouds"
                  ? cloud
                  : weather == "Rain"
                  ? rain
                  : weather == "Clear"
                  ? clear
                  : weather == "Haze"
                  ? haze
                  : mist
              }
            />
            <p>{weather}</p>
          </div>
        );
      })}
    </>
  );
}
