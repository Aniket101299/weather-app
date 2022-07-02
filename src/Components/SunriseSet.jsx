import { useState, useEffect } from "react";
import "./SunriseSet.css";
export default function SunriseSunset({data}) {

  // sunrise and sunset

  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  useEffect(() => {

    let url = `https://api.sunrise-sunset.org/json?lat=${data.coord.lat}&lng=${data.coord.lon}&formatted=0`;

   fetch(url)
  .then(res => res.json())
  .then(data => {
    const sunrise = new Date(data.results.sunrise);
    const sunset = new Date(data.results.sunset);
    let x = sunrise.toString();
    let y = sunset.toString();
    let rise = "";
    let set = "";
    for(let i=16; i<21; i++) {
        rise+= x[i];
        set+= y[i];
    }
  console.log("rise",rise);
  console.log("set",set);
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
    // setSunrise(x);
    // setSunset(y);
    // console.log( "sunrise", x);
    // console.log( "sunset", y);
    // console.log( "sunrise" ,x.length);
    // console.log( "sunset" ,y.length);
  });
  },[]);

  



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

return (
    <div className='sunriseSunset'>
    <div>
      <p>Sunrise</p>
      <p> {sunrise} am</p>
    </div>
    <div>
      <p>Sunset</p>
      <p> {sunset} pm</p>
    </div>
  </div>
)
}