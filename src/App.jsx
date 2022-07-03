import './App.css';
import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import React, {Component} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

import { Navbar } from './Components/Navbar';
import { Main } from './Components/Main';
import ApexChartTemp from './Components/ApexChart';


import rain from "./images/rain.png";
import mist from "./images/mist.png";
import cloud from "./images/clouds.png";
import clear from "./images/clear.png";
import haze from "./images/haze.png";
import SunriseSunset from './Components/SunriseSet';
import SunriseSetGraph from './Components/SunriseSetGraph';
 


function App() {

let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";
let google_map_key = "AIzaSyB_iyI-ZoAiV9j3HaHH58AEo62mXxOhL5Q";


const [city, setCity] = useState("");
const [call, setCall] = useState("");
const [data, setData] = useState("");
const [permission, setPermission] = useState(false);
const [sevenDayData, setSevenDayData] = useState("");
const [hourlyTemp, sethourlyTemp] = useState("");
const [sevenDaySunData, setSevenDaySunData] = useState("");



let map_url = `https://www.google.com/maps/embed/v1/search?key=${google_map_key}&q=${city}`;

const handleCity = (e) => {
  const {value} = e.target.value;
  setCity(value);
}

const getData = () => {
  setCall("callApi");
}


useEffect(() => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

function showPosition(position) {
// setPermission(true);
let IPtoken = "87e30487d2330d";

axios.get(`https://ipinfo.io/json?token=${IPtoken}`)
.then((res) => {
  // if(permission == true) {
    setCity(res.data.city);
  // }
    // user city weather
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${res.data.city}&appid=${weather_key}&units=metric`;
    axios.get(url)
    .then((res) => {
    console.log("singleDay",res.data);
    setData(res.data);
    sevenDayFun(res.data.coord.lat,res.data.coord.lon);
    twelveHourTemp(res.data.coord.lat,res.data.coord.lon);  
    })

})

}

},[]);


async function sevenDayFun(latitude, longitude) {
    
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${weather_key}&units=metric`;
  try {
      let responce = await fetch(url);
      let Seven_data = await responce.json();       
      console.log("sevenDay",Seven_data.daily);
      

  let sevenDay_Data = [];


Seven_data.daily.forEach(function(Eachday) {

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
    // console.log(typeof da.toDateString())
    let weekday = "";
    for(let i=0; i<3; i++) {
    weekday = weekday + wday[i];
    }
    // console.log(weekday);
  
    let mintemp = Math.floor(Eachday.temp.min);
    let maxtemp = Math.floor(Eachday.temp.max);
    let currDayTemp = Math.floor(Eachday.temp.day);

let dayInfo = {
  name: weekday,
  minTemp:`${mintemp}°`,
  maxTemp:`${maxtemp}°`,
  weather: Eachday.weather[0].main,
  currentDayTemp: `${currDayTemp}°`
}   

sevenDay_Data.push(dayInfo);

})


setSevenDayData(sevenDay_Data);
setSevenDaySunData([latitude, longitude]);

} catch(err) {
  console.log(err.message);
}
}



   // 24 hour temp forecast and sunrise sunset data

  async function twelveHourTemp(lat,lon) {
    let url24 = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`;
    // axios.get(url24)
    // .then((res) => {
    //   console.log("24h", res);
    // })
    try{
    let res = await fetch(url24);
    let data = await res.json();
    console.log("24h", data.hourly);
    console.log("sevenDaySunData", data.daily);
    sethourlyTemp(data.hourly);
   
    } catch(err) {
      console.log(err.message);
    }
  }







useEffect(()=> {
  // Weather of a city 
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
      axios.get(url)
      .then((res) => setData(res.data))
  },[call]);




// useEffect(() => {
//   let IPtoken = "87e30487d2330d";

//   axios.get(`https://ipinfo.io/json?token=${IPtoken}`)
//   .then((res) => {
//     if(permission == true) {
//       setCity(res.data.city);
//     }
//   })
  
// },[permission]);

// useEffect(() => {
//   // user city weather
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
//   axios.get(url)
//   .then((res) => {setData(res.data); console.log(res)})
//   },[])

const [item2, setItem2] = useState("");

function getItemParent(x){
    setItem2(x);
}



// class ApexChartTemp extends Component {
// constructor(props) {
//   super(props);

//   this.state = {
  
//     series: [{
//       name:`Temperature`,
//       data: [
//       [1, Math.floor(hourlyTemp[0].temp)],[2, Math.floor(hourlyTemp[1].temp)],[3, Math.floor(hourlyTemp[2].temp)],
//       [4, Math.floor(hourlyTemp[3].temp)],[5, Math.floor(hourlyTemp[4].temp)],[6, Math.floor(hourlyTemp[5].temp)],
//       [7, Math.floor(hourlyTemp[6].temp)],[8, Math.floor(hourlyTemp[7].temp)],[9, Math.floor(hourlyTemp[8].temp)],
//       [10, Math.floor(hourlyTemp[9].temp)],[11, Math.floor(hourlyTemp[10].temp)],[12, Math.floor(hourlyTemp[11].temp)],
//       [1, Math.floor(hourlyTemp[12].temp)],[2, Math.floor(hourlyTemp[13].temp)],[3, Math.floor(hourlyTemp[14].temp)],
//       [4, Math.floor(hourlyTemp[15].temp)],[5, Math.floor(hourlyTemp[16].temp)],[6, Math.floor(hourlyTemp[17].temp)],
//       [7, Math.floor(hourlyTemp[18].temp)],[8, Math.floor(hourlyTemp[19].temp)],[9, Math.floor(hourlyTemp[20].temp)],
//       [10, Math.floor(hourlyTemp[21].temp)],[11, Math.floor(hourlyTemp[22].temp)],[12, Math.floor(hourlyTemp[23].temp)]
//       ]
//     }],
//     options: {
//       chart: {
//         type: 'area',
//         zoom: {
//           enabled: false
//         }
//       },
//       stroke: {
//         curve: 'straight'
//       },
//       xaxis: {
//         type: 'numeric',
//       }
//     },
//   };
// }
// }



  return (
   
    <>
    {city == "" ? <h2> Please allow your location to use Weather App</h2> : 
    <div className="App">
      
      {/* left fiv */}
       <div className='info'>

          <div className='inDiv'>
            <div className='searchBox'> 
                <div> <FontAwesomeIcon className='location' icon={faLocationDot} /> </div> 
                <div> <input className='input' placeholder="Search" ></input> </div> 
                <div> <FontAwesomeIcon className='searchIcon' icon={faMagnifyingGlass} />  </div>
            </div>

            <div className='sevenDay'>

            <div>
              <p>{sevenDayData[0].name}</p>
              <span>{`${sevenDayData[0].minTemp}`}</span>
              <span>{`${sevenDayData[0].maxTemp}`}</span>
              <img src={sevenDayData[0].weather == "Clouds"? cloud : sevenDayData[0].weather == "Rain"? rain : sevenDayData[0].weather == "Clear"? clear : sevenDayData[0].weather == "Haze"? haze : mist}/>
              <p>{sevenDayData[0].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[1].name}</p>
              <span>{`${sevenDayData[1].minTemp}`}</span>
              <span>{`${sevenDayData[1].maxTemp}`}</span>
              <img src={sevenDayData[1].weather == "Clouds"? cloud : sevenDayData[1].weather == "Rain"? rain : sevenDayData[1].weather == "Clear"? clear : sevenDayData[1].weather == "Haze"? haze : mist}/>
              <p>{sevenDayData[1].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[2].name}</p>
              <span>{`${sevenDayData[2].minTemp}`}</span>
              <span>{`${sevenDayData[2].maxTemp}`}</span>
               <img src={sevenDayData[2].weather == "Clouds"? cloud : sevenDayData[2].weather == "Rain"? rain : sevenDayData[2].weather == "Clear"? clear : sevenDayData[2].weather == "Haze"? haze : mist}/>
              <p>{sevenDayData[2].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[3].name}</p>
              <span>{`${sevenDayData[3].minTemp}`}</span>
              <span>{`${sevenDayData[3].maxTemp}`}</span>
              <img src={sevenDayData[3].weather == "Clouds"? cloud : sevenDayData[3].weather == "Rain"? rain : sevenDayData[3].weather == "Clear"? clear : sevenDayData[3].weather == "Haze"? haze : mist}/>
              <p>{sevenDayData[3].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[4].name}</p>
              <span>{`${sevenDayData[4].minTemp}`}</span>
              <span>{`${sevenDayData[4].maxTemp}`}</span>
              <img src={sevenDayData[4].weather == "Clouds"? cloud : sevenDayData[4].weather == "Rain"? rain : sevenDayData[4].weather == "Clear"? clear : sevenDayData[4].weather == "Haze"? haze : mist}/>
              <p>{sevenDayData[4].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[5].name}</p>
              <span>{`${sevenDayData[5].minTemp}`}</span>
              <span>{`${sevenDayData[5].maxTemp}`}</span>
              <img src={sevenDayData[5].weather == "Clouds"? cloud : sevenDayData[5].weather == "Rain"? rain : sevenDayData[5].weather == "Clear"? clear : sevenDayData[5].weather == "Haze"? haze : mist}/>
              <p>{sevenDayData[5].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[6].name}</p>
              <span>{`${sevenDayData[6].minTemp}`}</span>
              <span>{`${sevenDayData[6].maxTemp}`}</span>
              <img src={sevenDayData[6].weather == "Clouds"? cloud : sevenDayData[6].weather == "Rain"? rain : sevenDayData[6].weather == "Clear"? clear : sevenDayData[6].weather == "Haze"? haze : mist}/>
              <p>{sevenDayData[6].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[7].name}</p>
              <span>{`${sevenDayData[7].minTemp}`}</span>
              <span>{`${sevenDayData[7].maxTemp}`}</span>
              <img src={sevenDayData[7].weather == "Clouds"? cloud : sevenDayData[7].weather == "Rain"? rain : sevenDayData[7].weather == "Clear"? clear : sevenDayData[7].weather == "Haze"? haze : mist}/>
              <p>{sevenDayData[7].weather}</p>
            </div>     

            </div> 

            <div className='graphs'>
              
              <div className='TempImg'>
                <div>{`${sevenDayData[0].currentDayTemp}C`}</div>
                <div> <img src={sevenDayData[0].weather == "Clouds"? cloud : sevenDayData[0].weather == "Rain"? rain : sevenDayData[0].weather == "Clear"? clear : sevenDayData[0].weather == "Haze"? haze : mist}/> </div>
              </div>
             
              <div className='graphDiv'>  
                <ApexChartTemp hourlyTemp={hourlyTemp}/>
              </div>

              <div className='pressureHumidity'>
                <div>
                  <p>Pressure</p>
                  <p>{data.main.pressure} hPa</p>
                </div>
                <div>
                  <p>Humidity</p>
                  <p>{data.main.humidity} %</p>
                </div>
              </div>

              <SunriseSunset data={data}/>

              <SunriseSetGraph sevenDaySunData={sevenDaySunData}/>

            </div>  

            
              {/* <header className='App-header'> */}
              {/* <Chart
              type="area"
              width={350}
              height={350}
              series= {[{
              name:`Temperature`,
              data: [
              [1, Math.floor(hourlyTemp[0].temp)],[2, Math.floor(hourlyTemp[1].temp)],[3, Math.floor(hourlyTemp[2].temp)],
              [4, Math.floor(hourlyTemp[3].temp)],[5, Math.floor(hourlyTemp[4].temp)],[6, Math.floor(hourlyTemp[5].temp)],
              [7, Math.floor(hourlyTemp[6].temp)],[8, Math.floor(hourlyTemp[7].temp)],[9, Math.floor(hourlyTemp[8].temp)],
              [10, Math.floor(hourlyTemp[9].temp)],[11, Math.floor(hourlyTemp[10].temp)],[12, Math.floor(hourlyTemp[11].temp)],
              [1, Math.floor(hourlyTemp[12].temp)],[2, Math.floor(hourlyTemp[13].temp)],[3, Math.floor(hourlyTemp[14].temp)],
              [4, Math.floor(hourlyTemp[15].temp)],[5, Math.floor(hourlyTemp[16].temp)],[6, Math.floor(hourlyTemp[17].temp)],
              [7, Math.floor(hourlyTemp[18].temp)],[8, Math.floor(hourlyTemp[19].temp)],[9, Math.floor(hourlyTemp[20].temp)],
              [10, Math.floor(hourlyTemp[21].temp)],[11, Math.floor(hourlyTemp[22].temp)],[12, Math.floor(hourlyTemp[23].temp)]
              ]
              }]} 
               options={
                xaxis: {type: 'numeric'},
                stroke: {curve: 'straight'}
              }
              >   

              </Chart>  */}
              {/* <Chart 
              className="tempGraph"
              type='area'
              width={510}
              height={210}
              series={[
                {name: "Temperature",
                 data:[
                  [1, Math.floor(hourlyTemp[0].temp)],[2, Math.floor(hourlyTemp[1].temp)],[3, Math.floor(hourlyTemp[2].temp)],
                  [4, Math.floor(hourlyTemp[3].temp)],[5, Math.floor(hourlyTemp[4].temp)],[6, Math.floor(hourlyTemp[5].temp)],
                  [7, Math.floor(hourlyTemp[6].temp)],[8, Math.floor(hourlyTemp[7].temp)],[9, Math.floor(hourlyTemp[8].temp)],
                  [10, Math.floor(hourlyTemp[9].temp)],[11, Math.floor(hourlyTemp[10].temp)],[12, Math.floor(hourlyTemp[11].temp)],
                  [1, Math.floor(hourlyTemp[12].temp)],[2, Math.floor(hourlyTemp[13].temp)],[3, Math.floor(hourlyTemp[14].temp)],
                  [4, Math.floor(hourlyTemp[15].temp)],[5, Math.floor(hourlyTemp[16].temp)],[6, Math.floor(hourlyTemp[17].temp)],
                  [7, Math.floor(hourlyTemp[18].temp)],[8, Math.floor(hourlyTemp[19].temp)],[9, Math.floor(hourlyTemp[20].temp)],
                  [10, Math.floor(hourlyTemp[21].temp)],[11, Math.floor(hourlyTemp[22].temp)],[12, Math.floor(hourlyTemp[23].temp)]
                 ]
                }
              ]}
              options={{
                chart: {
                  type: 'area',
                  zoom: {
                    enabled: false
                  }
                },
                // xaxis: {type: 'numeric'},
                // yaxis: {type: 'numeric'},
                // stroke: {
                //   curve: 'straight'
                // },
                // labels: "hi",
              
              
              }}
              >
              
              </Chart> */}
              {/* <Chart className="ApexChartTemp" options={this.state.options} series={this.state.series} type="area"/>  */}
              {/* </header> 
              </div> */}
            
           
           
          </div>
       </div>

       {/* right div */}
       <div className='map'>
          <iframe className='iframeBox' frameBorder={0} src={map_url} allowFullScreen>
          </iframe>
       </div>
    </div>
    }


{/* 
  <div className="AppComponent">    
    <Navbar getItemParent = {getItemParent}/>
    <Main value = {item2}/>
  </div> */}




{/* <div className="search">   
<input type="text" value={city} onChange={handleCity} className="city" placeholder="enter city"/>
<button onClick={() => getData}>Search</button>  
</div>

<div>Data:</div> */}

    </>
  
)
}

export default App;








