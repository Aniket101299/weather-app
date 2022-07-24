import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./SunriseSet.css";


export default function SunriseSunset() {

  let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";
  const city = useSelector((state) => state.city.city);
  const clickData = useSelector((state) => state.onclickData.onclickData);
  // console.log("Suncity",city);

  
    const [Sunrise, setSunrise] = useState("");
    const [Sunset, setSunset] = useState("");

  const fetchCityData = async () => {
    try{

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
    const response = await axios
          .get(url)
          .catch((err) => {
            console.log("Error ", err);
          });


          // console.log("DATA", response.data.sys);

//           let unix = 1507473344;
// let date = new Date(unix*1000);

// console.log(date);   // 2017-10-08T14:35:44.000Z

          const sunrise = new Date((response.data.sys.sunrise)*1000);
          const sunset = new Date((response.data.sys.sunset)*1000);
          let x = sunrise.toString();
          let y = sunset.toString();

        // console.log("NOGoogleRise", x);
        // console.log("NOGoogleSet", y);

          let rise = "";
          let set = "";
          for(let i=16; i<21; i++) {
              rise+= x[i];
              set+= y[i];
          }
        // console.log("rise",rise);
        // console.log("set",set);
          let riseHour = "";
          let setHour = ""; 
      
          for(let i=0; i<2; i++) {
              riseHour+= rise[i];
          }
      
          for(let i=0; i<2; i++) {
            setHour+= set[i];
          }
      
          riseHour = +riseHour;
          setHour = +setHour;
          
          if(riseHour>12) {
             riseHour = riseHour - 12;
             rise = rise.substring(2);
             rise = riseHour + rise;
          } else {
             rise = rise.substring(1);
          }
      
          if(setHour>12) {
            setHour = setHour - 12;
            set = set.substring(2);
            set = setHour + set;
          } else {
            set = set.substring(1);
          }
      
          setSunrise(rise);
          setSunset(set);
          
      
          // console.log("rise",rise);
          // console.log("set",set);

        } catch(err) {
          console.log("Error", err);
        }

  }
  

  
const fetch_SunData = async (lat, lon) => {

  try{

  let url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;

  const response = await axios
        .get(url)
        .catch((err) => {
          console.log("Error ", err);
        });
// console.log("ONEDAYSUN", response.data.results);
    const sunrise = new Date(response.data.results.sunrise);
    const sunset = new Date(response.data.results.sunset);
    let x = sunrise.toString();
    let y = sunset.toString();
    // console.log("GoogleRise", x);
    // console.log("GoogleSet", y);
    let rise = "";
    let set = "";
    for(let i=16; i<21; i++) {
        rise+= x[i];
        set+= y[i];
    }
  // console.log("rise",rise);
  // console.log("set",set);
    let riseHour = "";
    let setHour = ""; 

    for(let i=0; i<2; i++) {
        riseHour+= rise[i];
    }

    for(let i=0; i<2; i++) {
      setHour+= set[i];
    }

    riseHour = +riseHour;
    setHour = +setHour;
    
    if(riseHour>12) {
       riseHour = riseHour - 12;
       rise = rise.substring(2);
       rise = riseHour + rise;
    } else {
       rise = rise.substring(1);
    }

    if(setHour>12) {
      setHour = setHour - 12;
      set = set.substring(2);
      set = setHour + set;
    } else {
      set = set.substring(1);
    }

    setSunrise(rise);
    setSunset(set);
    

    // console.log("rise",rise);
    // console.log("set",set);

  } catch(err) {
    console.log("Error", err);
  }

}



  
    useEffect(() => {
      fetchCityData();
    }, [city])
  
    

return (

  <> 

{(clickData &&   
<div className='sunriseSunset'>
  <div>
    <p>Sunrise</p>
    <p> {clickData.rise} am</p>
  </div>
  <div>
    <p>Sunset</p>
    <p> {clickData.set} pm</p>
  </div>
</div>) || 

  <div className='sunriseSunset'>
    <div>
      <p>Sunrise</p>
      <p> {Sunrise} am</p>
    </div>
    <div>
      <p>Sunset</p>
      <p> {Sunset} pm</p>
    </div>
  </div>
}

</>

)
}