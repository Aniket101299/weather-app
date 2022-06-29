import './App.css';
import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

import { Navbar } from './Components/Navbar';
import { Main } from './Components/Main';

import rain from "./images/rain.png";
import mist from "./images/mist.png";
import cloud from "./images/clouds.png";
import clear from "./images/clear.png";
import haze from "./images/haze.png";
 


function App() {

let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";
let google_map_key = "AIzaSyB_iyI-ZoAiV9j3HaHH58AEo62mXxOhL5Q";


const [city, setCity] = useState("");
const [call, setCall] = useState("");
const [data, setData] = useState("");
const [permission, setPermission] = useState(false);
const [sevenDayData, setSevenDayData] = useState("");

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
    .then((res) => {console.log(res.data)
    
    sevenDayFun(res.data.coord.lat,res.data.coord.lon);  
    
    })
})

// setData(res.data);

}

},[]);


async function sevenDayFun(latitude, longitude) {
    
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${weather_key}&units=metric`;
  try {
      let responce = await fetch(url);
      let Seven_data = await responce.json();       
      // console.log("seven",Seven_data.daily);
      

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
              <img src={sevenDayData[0].weather == "Clouds"? cloud : sevenDayData[0].weather == "Rain"? rain : sevenDayData[0].weather == "Clear"? clear : sevenDayData[0].weather == "Haze"? haze : "Mist"}/>
              <p>{sevenDayData[0].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[1].name}</p>
              <span>{`${sevenDayData[1].minTemp}`}</span>
              <span>{`${sevenDayData[1].maxTemp}`}</span>
              <img src={sevenDayData[1].weather == "Clouds"? cloud : sevenDayData[1].weather == "Rain"? rain : sevenDayData[1].weather == "Clear"? clear : sevenDayData[1].weather == "Haze"? haze : "Mist"}/>
              <p>{sevenDayData[1].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[2].name}</p>
              <span>{`${sevenDayData[2].minTemp}`}</span>
              <span>{`${sevenDayData[2].maxTemp}`}</span>
               <img src={sevenDayData[2].weather == "Clouds"? cloud : sevenDayData[2].weather == "Rain"? rain : sevenDayData[2].weather == "Clear"? clear : sevenDayData[2].weather == "Haze"? haze : "Mist"}/>
              <p>{sevenDayData[2].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[3].name}</p>
              <span>{`${sevenDayData[3].minTemp}`}</span>
              <span>{`${sevenDayData[3].maxTemp}`}</span>
              <img src={sevenDayData[3].weather == "Clouds"? cloud : sevenDayData[3].weather == "Rain"? rain : sevenDayData[3].weather == "Clear"? clear : sevenDayData[3].weather == "Haze"? haze : "Mist"}/>
              <p>{sevenDayData[3].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[4].name}</p>
              <span>{`${sevenDayData[4].minTemp}`}</span>
              <span>{`${sevenDayData[4].maxTemp}`}</span>
              <img src={sevenDayData[4].weather == "Clouds"? cloud : sevenDayData[4].weather == "Rain"? rain : sevenDayData[4].weather == "Clear"? clear : sevenDayData[4].weather == "Haze"? haze : "Mist"}/>
              <p>{sevenDayData[4].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[5].name}</p>
              <span>{`${sevenDayData[5].minTemp}`}</span>
              <span>{`${sevenDayData[5].maxTemp}`}</span>
              <img src={sevenDayData[5].weather == "Clouds"? cloud : sevenDayData[5].weather == "Rain"? rain : sevenDayData[5].weather == "Clear"? clear : sevenDayData[5].weather == "Haze"? haze : "Mist"}/>
              <p>{sevenDayData[5].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[6].name}</p>
              <span>{`${sevenDayData[6].minTemp}`}</span>
              <span>{`${sevenDayData[6].maxTemp}`}</span>
              <img src={sevenDayData[6].weather == "Clouds"? cloud : sevenDayData[6].weather == "Rain"? rain : sevenDayData[6].weather == "Clear"? clear : sevenDayData[6].weather == "Haze"? haze : "Mist"}/>
              <p>{sevenDayData[6].weather}</p>
            </div>
            <div>
              <p>{sevenDayData[7].name}</p>
              <span>{`${sevenDayData[7].minTemp}`}</span>
              <span>{`${sevenDayData[7].maxTemp}`}</span>
              <img src={sevenDayData[7].weather == "Clouds"? cloud : sevenDayData[7].weather == "Rain"? rain : sevenDayData[7].weather == "Clear"? clear : sevenDayData[7].weather == "Haze"? haze : "Mist"}/>
              <p>{sevenDayData[7].weather}</p>
            </div>     

            </div>

            <div className='graphs'>
              <p>{`${sevenDayData[0].currentDayTemp}C`}</p>
              <div> <img src={sevenDayData[0].weather == "Clouds"? cloud : sevenDayData[0].weather == "Rain"? rain : sevenDayData[0].weather == "Clear"? clear : sevenDayData[0].weather == "Haze"? haze : "Mist"}/> </div>
              {/* <Chart
              type="area"
              width={350}
              height={350}
              series={[
              {}
              ]}
              >  

              </Chart>*/}
            </div>

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








