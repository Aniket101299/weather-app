import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./PressureAndHum.css";

export default function PressureAndHum() {
  let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";
  const city = useSelector((state) => state.city.city);
  const clickData = useSelector((state) => state.onclickData.onclickData);
  const [data, setData] = useState({});

  const fetchCityData = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
      const response = await axios.get(url).catch((err) => {
        console.log("Error ", err);
      });
      // console.log("PressureAndHum", response);
      setData(response.data.main);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const setPressHum = () => {
    return (
      <div className="pressureHumidity">
        <div>
          <p>Pressure</p>
          <p>{data.pressure} hPa</p>
        </div>
        <div>
          <p>Humidity</p>
          <p>{data.humidity} %</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchCityData();
  }, [city]);

  return (
    <>
      {(clickData && (
        <div className="pressureHumidity">
          <div>
            <p>Pressure</p>
            <p>{clickData.pressure} hPa</p>
          </div>
          <div>
            <p>Humidity</p>
            <p>{clickData.humidity} %</p>
          </div>
        </div>
      )) ||
        setPressHum()}
    </>
  );
}
