import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setSevenDay,
  setOnclick,
  set12Hour,
  setChangableTemp,
} from "../redux/actions/actions";
// import SetSevenDayData from "./SetSevenDayData";

import "./SevenDay.css";

import rain from "../images/rain.png";
import mist from "../images/mist.png";
import cloud from "../images/clouds.png";
import clear from "../images/clear.png";
import haze from "../images/haze.png";

export default function SevenDay({ data }) {
  let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";

  const [loading, setLoading] = useState(true);
  const [colour, setColour] = useState([
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ]);
  const [border, setBorder] = useState([
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ]);

  const city = useSelector((state) => state.city.city);
  const sevenData = useSelector((state) => state.sevenDayData.sevenDayData);
  const clickRise = useSelector((state) => state.sunriseData.sunriseData);
  const clickSet = useSelector((state) => state.sunsetData.sunsetData);
  const allSeven = useSelector((state) => state.allSevenData.allSevenData);
  const temp12Hour = useSelector((state) => state.Temp12Hour.TwelveHour);

  // console.log("TEMPERATURES", temp12Hour);

  const dispatch = useDispatch();

  useEffect(() => {
    if (temp12Hour) {
      setLoading(false);
    }
  }, [temp12Hour]);

  useEffect(() => {
    // user city weather
    fetchCityLatLon();
    // console.log("hi inside useEffect");
  }, [city]);

  const fetchCityLatLon = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
      const response = await axios.get(url).catch((err) => {
        console.log("Error ", err);
      });
      let longitude = response.data.coord.lon;
      let lattitude = response.data.coord.lat;

      fetchSevenDay(longitude, lattitude);

      // console.log("singleDay", response.data.coord);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const fetchSevenDay = async (lon, lat) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`;

      const response = await axios.get(url).catch((err) => {
        console.log("Error ", err);
      });

      let data = await response.data.daily;

      // 7 Day data

      let sevenDay_Data = [];

      data.map((Eachday) => {
        let date = Eachday.dt;

        function pad(value) {
          return value > 9 ? value : "0" + value;
        }
        var utc = date;
        var d = new Date(0);
        d.setUTCSeconds(utc);
        var m =
          d.getUTCFullYear() +
          "-" +
          pad(d.getUTCMonth() + 1) +
          "-" +
          pad(d.getUTCDate());
        // console.log(m);

        const da = new Date(m);
        // console.log("da" ,da);

        let wday = da.toDateString();
        // console.log(typeof da.toDateString())
        let weekday = "";
        for (let i = 0; i < 3; i++) {
          weekday = weekday + wday[i];
        }
        // console.log(weekday);

        let mintemp = Math.floor(Eachday.temp.min);
        let maxtemp = Math.floor(Eachday.temp.max);
        let currDayTemp = Math.floor(Eachday.temp.day);

        let dayInfo = {
          name: weekday,
          minTemp: `${mintemp}°`,
          maxTemp: `${maxtemp}°`,
          weather: Eachday.weather[0].main,
          currentDayTemp: `${currDayTemp}°`,
        };

        sevenDay_Data.push(dayInfo);
      });

      dispatch(setSevenDay(sevenDay_Data));

      // console.log("Seven", response.data.daily);
    } catch (err) {
      console.log("Error", err);
    }
  };

  if (loading) {
    return <p>..Loading</p>;
  }

  let start;

  const setData = (index, currentDayTemp, weather) => {
    let rise = clickRise[index];
    let set = clickSet[index];
    let pressure = allSeven[index].pressure;
    let humidity = allSeven[index].humidity;
    // console.log("index", index);

    let temperatures;

    if (index == 0) {
      start = 0;
    } else if (index == 1) {
      start = 6;
    } else if (index == 2) {
      start = 12;
    } else if (index == 3) {
      start = 18;
    } else if (index == 4) {
      start = 24;
    } else if (index == 5) {
      start = 30;
    } else if (index == 6) {
      start = 36;
    } else {
      start = 15;
    }

    // console.log("START", start);

    let limit = start + 12;

    // console.log("LIMIT", limit);

    if (temp12Hour?.length > 0 && true) {
      temperatures = [];
      for (let i = start; i < limit; i++) {
        // if(temp12Hour)
        temperatures.push(temp12Hour[i]);
      }
      // for(let i=0; i<start; i++) {
      //   temperatures.push(temp12Hour[i]);
      // }
      // for(let i=start+1; i<temp12Hour.length; i++) {
      //   temperatures.push(temp12Hour[i]);
      // }
      dispatch(setChangableTemp(temperatures));
    }

    // console.log("temperatures", temperatures);

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

    let colours = [];
    let borders = [];
    for (let i = 0; i < colour.length; i++) {
      if (i != index) {
        colours.push("white");
        borders.push("white");
      } else {
        // colours.push("#fffdf7");
        colours.push("#ccffdd");
        // colours.push("#1aff62");
        borders.push("#00a6fa");
      }
    }
    setColour(colours);
    setBorder(borders);
  };

  const renderSeven = sevenData.map((day, i) => {
    const { name, minTemp, maxTemp, weather, currentDayTemp } = day;

    // (clicked && clicked == true) ? {backgroundColor:"blue"} :
    // style={{backgroundColor: "gray"}}

    return (
      <div
        className="individual"
        key={i}
        onClick={() => setData(i, currentDayTemp, weather)}
        style={{ backgroundColor: colour[i], border: `3px solid ${border[i]}` }}
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
  });

  return (
    <>
      {/* <div>  */}
      {/* <SetSevenDayData />     */}
      {/* {sevenData && renderSeven } */}
      {sevenData?.length > 0 && (
        <div className="sevenDay">
          {sevenData?.map((item, i) => (
            <div
              key={i}
              className="individual"
              onClick={() => setData(i, item.currentDayTemp, item.weather)}
              style={{
                backgroundColor: colour[i],
                border: `3px solid ${border[i]}`,
                borderRadius: "7px",
              }}
            >
              <p>{item.name}</p>
              <span>{item.minTemp}</span>
              <span>{item.maxTemp}</span>
              <img
                src={
                  item.weather == "Clouds"
                    ? cloud
                    : item.weather == "Rain"
                    ? rain
                    : item.weather == "Clear"
                    ? clear
                    : item.weather == "Haze"
                    ? haze
                    : mist
                }
              />
              <p>{item.weather}</p>
            </div>
          ))}
        </div>
      )}
      {/* </div>  */}
    </>
  );
}
