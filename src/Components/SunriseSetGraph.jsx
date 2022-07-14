import React, {Component} from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSunrise, setSunset, setDates } from "../redux/actions/actions";
import Chart from 'react-apexcharts'
import "./SunriseSetGraph.css";
import { useRef } from "react";

 

const SunriseSetGraph = () =>  {


let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";
const city = useSelector((state) => state.city.city);

const riseData = useSelector((state) => state.sunriseData.sunriseData);
const setData = useSelector((state) => state.sunsetData.sunsetData);
console.log("RISEDATA", riseData);
console.log("SETDATA", setData);
const dispatch = useDispatch();

let arr = [];
let sunR = [];
localStorage.setItem("riseData", JSON.stringify(sunR));
let riseSun = JSON.parse(localStorage.getItem("riseData")) || [];
// var sunriseData = [];
// var sunsetData = [];


// const [sunriseData, setSunriseData] = useState([]);
// const [sunsetData, setSunsetData] = useState([]);


const fetchCityData = async () => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
  const response = await axios
        .get(url)
        .catch((err) => {
          console.log("Error ", err);
        });
      let longitude = response.data.coord.lon;
      let lattitude = response.data.coord.lat; 
      fetch_SunData(lattitude,longitude);
        
}


const fetch_SunData = (lattitude,longitude) => {

  
  let url7Day = `http://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${weather_key}&units=metric`;
  
  fetch(url7Day)
  .then(res => res.json())
  .then(data => {
    // console.log("XXXXXXXX", data.daily);
    let Data = data.daily;
    
    let dates = [];
    let sunriseData = [];
    let sunsetData = [];
 
Data.forEach((Eachday,i) => {
    
let date = Eachday.dt;

function pad(value) {
    return value > 9 ? value: "0" + value;
}
var utc = date;
var d = new Date(0); 
d.setUTCSeconds(utc);
var m = d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
// console.log(m);

    const da = new Date(m);
    // console.log("da" ,da);
    
  let wday = da.toDateString();
    // console.log("wday", wday);

    let dateOfGraph = "";
    for(let i=4; i<wday.length-5; i++) {
        dateOfGraph = dateOfGraph + wday[i];
    }

    localStorage.setItem(`date${i}`, JSON.stringify(dateOfGraph));
    dates.push(dateOfGraph);

    // console.log(dateOfGraph);

    // getSunData(lattitude,longitude,dateOfGraph);
    
    let riseSun = Eachday.sunrise;
    let setSun = Eachday.sunset;

let sunrise = new Date(riseSun*1000);
let sunset = new Date(setSun*1000);

let x = sunrise.toString();
let y = sunset.toString();

let rise = "";
let set = "";
for(let i=16; i<21; i++) {
    rise+= x[i];
    set+= y[i];
}

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

 let newRise = "";
 let newSet = "";

 for(let i=0; i<rise.length; i++) {
    if(rise[i] == ":") {
        newRise+=  ".";
    } else {
        newRise+= rise[i];
    }
 }

 
 for(let i=0; i<set.length; i++) {
    if(set[i] == ":") {
        newSet+=  ".";
    } else {
        newSet+= set[i];
    }
 }


  newRise = +newRise;
  newSet = +newSet;

  sunriseData.push(newRise);
  sunsetData.push(newSet);

 })

 localStorage.setItem("dates", JSON.stringify(dates));

 getSunData(lattitude,longitude);

 console.log("dates", dates);

// console.log( "sunriseData", sunriseData);
dispatch(setDates(dates));
dispatch(setSunrise(sunriseData));
dispatch(setSunset(sunsetData));
// console.log("sunsetData", sunsetData);

})

}




const getSunData =  (lattitude, longitude) => {

  let Dates = JSON.parse(localStorage.getItem("dates"));



  Dates.forEach((date, i) => {

  let url1 = `https://api.sunrise-sunset.org/json?lat=${lattitude}&lng=${longitude}&date=${date}&formatted=0`;

  fetch(url1).then((res) => res.json()).then((data) => {
    
//  console.log("YYYYYYYY",data);
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
 
      let newRise = "";
      let newSet = "";
 
      for(let i=0; i<rise.length; i++) {
         if(rise[i] == ":") {
             newRise+=  ".";
         } else {
             newRise+= rise[i];
         }
      }
 
      
      for(let i=0; i<set.length; i++) {
         if(set[i] == ":") {
             newSet+=  ".";
         } else {
             newSet+= set[i];
         }
      }
 
 
       newRise = +newRise;
       newSet = +newSet;

       riseSun.push(newRise);
       localStorage.setItem("riseData", JSON.stringify(riseSun));
 localStorage.setItem(`sunrise${i}`, JSON.stringify(newRise));
 localStorage.setItem(`sunset${i}`, JSON.stringify(newSet));

//  sunriseData = [...sunriseData, newRise];
//  sunsetData = [...sunsetData, i];

//  sunriseData.push(newRise);
//  sunsetData.push(newSet);
 
//  dispatch(setSunrise(newRise));
//  dispatch(setSunset(newSet));
//  setSunriseData([...sunriseData, newRise]);
//  setSunsetData([...sunsetData, newSet]);


      console.log(`rise${i}`, newRise);
      console.log(`set${i}`,newSet);
 
    });

});



//  console.log("sunriseData", sunriseData);
//  console.log("sunsetData", sunsetData);
//  localStorage.setItem("riseData", sunriseData);

  // dispatch(setSunrise(riseSunData));
  // dispatch(setSunset(sunsetData));


}

// console.log("sunriseData", sunriseData);

// console.log("sunsetData", sunsetData);


useEffect(() => {
  fetchCityData();
}, [city])



let one = JSON.parse(localStorage.getItem("date0"));
let two = JSON.parse(localStorage.getItem("date1"));
let three = JSON.parse(localStorage.getItem("date2"));
let four = JSON.parse(localStorage.getItem("date3"));
let five = JSON.parse(localStorage.getItem("date4"));
let six = JSON.parse(localStorage.getItem("date5"));
let seven = JSON.parse(localStorage.getItem("date6"));
let eight = JSON.parse(localStorage.getItem("date7"));

let rise1 = Number(JSON.parse(localStorage.getItem("sunrise0")));
let rise2 = Number(JSON.parse(localStorage.getItem("sunrise1")));
let rise3 = Number(JSON.parse(localStorage.getItem("sunrise2")));
let rise4 = Number(JSON.parse(localStorage.getItem("sunrise3")));
let rise5 = Number(JSON.parse(localStorage.getItem("sunrise4")));
let rise6 = Number(JSON.parse(localStorage.getItem("sunrise5")));
let rise7 = Number(JSON.parse(localStorage.getItem("sunrise6")));
let rise8 = Number(JSON.parse(localStorage.getItem("sunrise7")));

let set1 = Number(JSON.parse(localStorage.getItem("sunset0")));
let set2 = Number(JSON.parse(localStorage.getItem("sunset1")));
let set3 = Number(JSON.parse(localStorage.getItem("sunset2")));
let set4 = Number(JSON.parse(localStorage.getItem("sunset3")));
let set5 = Number(JSON.parse(localStorage.getItem("sunset4")));
let set6 = Number(JSON.parse(localStorage.getItem("sunset5")));
let set7 = Number(JSON.parse(localStorage.getItem("sunset6")));
let set8 = Number(JSON.parse(localStorage.getItem("sunset7")));


let riseSunData = JSON.parse(localStorage.getItem("riseData"))
console.log("RISEDSUNDD", riseSunData);
// const riseData = () => {
//   if(sunriseData.length === 0) {
//     return (<p>...Loading</p>)
//   } else {
//     return (
//       [sunriseData[0],sunriseData[1],sunriseData[2],sunriseData[3],sunriseData[4],sunriseData[5],sunriseData[6],sunriseData[7]]
//     )
//   } 
// }

// const setData = () => {
//   if(sunsetData.length === 0) {
//     return (<p>...Loading</p>)
//   } else {
//     return (
//       [sunsetData[0],sunsetData[1],sunsetData[2],sunsetData[3],sunsetData[4],sunsetData[5],sunsetData[6],sunsetData[7]]
//     )
//   }
// }




const sunData = () => {

  if( riseData === undefined && setData === undefined ) {
    return ("...Loading");
  } else {

  return (
    [{
      name: 'Sunrise',
      // data:[10,20,30,40,50,60,70,80]
      // data:[rise1,rise2,rise3,rise4,rise5,rise6,rise7,rise8],
      data: [riseData[0],riseData[1],riseData[2],riseData[3],riseData[4],riseData[5],riseData[6],riseData[7]],
      // data:[sunriseData[0],sunriseData[1],sunriseData[2],sunriseData[3],sunriseData[4],sunriseData[5],sunriseData[6],sunriseData[7]]
     
    },{
      name: 'Sunset',
      // data:[20,40,50,60,70,80,100,120]
      // data:[set1,set2,set3,set4,set5,set6,set7,set8]
      data: [setData[0],setData[1],setData[2],setData[3],setData[4],setData[5],setData[6],setData[7]],
      // data:[sunsetData[0],sunsetData[1],sunsetData[2],sunsetData[3],sunsetData[4],sunsetData[5],sunsetData[6],sunsetData[7]]
      
    }]
  )

 }
}




      
     
      const state = {
          options: {
            chart: {
                type: 'area',
                zoom: {
                  enabled: false
                }
              },
            xaxis: {
              categories: [one,two,three,four,five,six,seven,eight],
              labels: {
                rotate: -15,
                rotateAlways: true
            }
          },
          yaxis: {
            show: false,
          },
            stroke: {
              curve: 'smooth'
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100]
                  },
              },
              legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: -10,
              },
              theme: {
                mode: 'light', 
                palette: 'palette1', 
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                },
            },
            colors: ['#feeb2d', '#ff7a03']
            }, 
          // series: [{
          //   name: 'Sunrise',
          //   data:[rise1,rise2,rise3,rise4,rise5,rise6,rise7,rise8],
          // },{
          //   name: 'Sunset',
          //   data:[set1,set2,set3,set4,set5,set6,set7,set8]
          // }]
        }
    

   
     
        return (
            <div className="chart">
                 <Chart options={state.options} series={sunData()} type="area" width={310} height={150} />
            </div>
        )
    
}


export default SunriseSetGraph;





