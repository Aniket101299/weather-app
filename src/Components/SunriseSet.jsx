import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./SunriseSet.css";


export default function SunriseSunset() {

  let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";
  const city = useSelector((state) => state.city.city);
  console.log("Suncity",city);

  
    const [Sunrise, setSunrise] = useState("");
    const [Sunset, setSunset] = useState("");

  const fetchCityData = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
    const response = await axios
          .get(url)
          .catch((err) => {
            console.log("Error ", err);
          });


          console.log("DATA", response.data.sys);

//           let unix = 1507473344;
// let date = new Date(unix*1000);

// console.log(date);   // 2017-10-08T14:35:44.000Z

          const sunrise = new Date((response.data.sys.sunrise)*1000);
          const sunset = new Date((response.data.sys.sunset)*1000);
          let x = sunrise.toString();
          let y = sunset.toString();

        console.log("NOGoogleRise", x);
        console.log("NOGoogleSet", y);

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
          
      
          console.log("rise",rise);
          console.log("set",set);


        let longitude = response.data.coord.lon;
        let lattitude = response.data.coord.lat; 
        // fetch_SunData(lattitude,longitude);
  }
  
  // const fetch_SunData = async (lat,lon) => {
  //   let url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
  
  //   const response = await axios
  //         .get(url)
  //         .catch((e) => {
  //           console.log("Err ", e);
  //         });
  //   console.log("DataTry", response);
  // }
  
  
const fetch_SunData = async (lat, lon) => {

  let url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;

  const response = await axios
        .get(url)
        .catch((err) => {
          console.log("Error ", err);
        });
console.log("ONEDAYSUN", response.data.results);
    const sunrise = new Date(response.data.results.sunrise);
    const sunset = new Date(response.data.results.sunset);
    let x = sunrise.toString();
    let y = sunset.toString();
    console.log("GoogleRise", x);
    console.log("GoogleSet", y);
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
    

    console.log("rise",rise);
    console.log("set",set);
    // setSunrise(x);
    // setSunset(y);
    // console.log( "sunrise", x);
    // console.log( "sunset", y);
    // console.log( "sunrise" ,x.length);
    // console.log( "sunset" ,y.length);
}



  
    useEffect(() => {
      fetchCityData();
    }, [city])
  
    















    // const todayData = useSelector((state) => state.TodayData.TodayData.coord);
    // const { lon, lat } = todayData;
  
  // console.log("sunri", todayData);

  // var url;

  // if(todayData !== undefined) {
  //   console.log("yes");
  //   url = `https://api.sunrise-sunset.org/json?lat=${todayData.lat}&lng=${todayData.lon}&formatted=0`;
  // }










  // useEffect(() => {

  // fetchSunData();  
  
  // },[city]);

  



//   function pad(value) {
//     return value > 9 ? value: "0" + value;
//   }

//   let rise = data.sys.sunrise;
//   console.log("rise",rise);
//   let d = new Date(0); 
//   d.setUTCSeconds(rise);
//   let sunrise = pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
//   console.log("sunrise",sunrise);


//   let set = data.sys.sunset;
//   let d1 = new Date(0); 
//   d1.setUTCSeconds(set);
//   let sunset = pad(d1.getUTCHours()) + ':' + pad(d1.getUTCMinutes()) + ':' + pad(d1.getUTCSeconds());
//   console.log("sunset",sunset);


















  // sunrise and sunset

  // const [sunrise, setSunrise] = useState("");
  // const [sunset, setSunset] = useState("");

  // useEffect(() => {

  //   let url = `https://api.sunrise-sunset.org/json?lat=${data.coord.lat}&lng=${data.coord.lon}&formatted=0`;

  //  fetch(url)
  // .then(res => res.json())
  // .then(data => {
  //   const sunrise = new Date(data.results.sunrise);
  //   const sunset = new Date(data.results.sunset);
  //   let x = sunrise.toString();
  //   let y = sunset.toString();
  //   let rise = "";
  //   let set = "";
  //   for(let i=16; i<21; i++) {
  //       rise+= x[i];
  //       set+= y[i];
  //   }
  // // console.log("rise",rise);
  // // console.log("set",set);
  //   let riseHour = "";
  //   let setHour = ""; 

  //   for(let i=0; i<2; i++) {
  //       riseHour+= rise[i];
  //   }

  //   for(let i=0; i<2; i++) {
  //     setHour+= set[i];
  //   }

  //   riseHour = +riseHour;
  //   setHour = +setHour;
    
  //   if(riseHour>12) {
  //      riseHour = riseHour - 12;
  //      rise = rise.substring(2);
  //      rise = riseHour + rise;
  //   } else {
  //      rise = rise.substring(1);
  //   }

  //   if(setHour>12) {
  //     setHour = setHour - 12;
  //     set = set.substring(2);
  //     set = setHour + set;
  //   } else {
  //     set = set.substring(1);
  //   }

  //   setSunrise(rise);
  //   setSunset(set);
    

  //   // console.log("rise",rise);
  //   // console.log("set",set);
  //   // setSunrise(x);
  //   // setSunset(y);
  //   // console.log( "sunrise", x);
  //   // console.log( "sunset", y);
  //   // console.log( "sunrise" ,x.length);
  //   // console.log( "sunset" ,y.length);
  // });
  // },[]);

  



  // function pad(value) {
  //   return value > 9 ? value: "0" + value;
  // }

  // let rise = data.sys.sunrise;
  // console.log("rise",rise);
  // let d = new Date(0); 
  // d.setUTCSeconds(rise);
  // let sunrise = pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
  // console.log("sunrise",sunrise);


  // let set = data.sys.sunset;
  // let d1 = new Date(0); 
  // d1.setUTCSeconds(set);
  // let sunset = pad(d1.getUTCHours()) + ':' + pad(d1.getUTCMinutes()) + ':' + pad(d1.getUTCSeconds());
  // console.log("sunset",sunset);




return (
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
)
}