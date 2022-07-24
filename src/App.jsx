import React, {Component} from "react";
import './App.css';
import PlacesAutocomplete from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCity, set12Hour, setToDay, setAllSevenData } from "./redux/actions/actions";
import Chart from 'react-apexcharts';
import { debounce } from "lodash";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";

import Loader from "./Components/Loader";
import ApexChartTemp from './Components/ApexChart';

import SunriseSunset from './Components/SunriseSet';
import SunriseSetGraph from './Components/SunriseSetGraph';
import SevenDay from './Components/SevenDay';
import TempAndImg from './Components/TempAndImg';
import PressureAndHum from './Components/PressureAndHum';
import Clock from "./Components/Clock";

 
function App() {

let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";
let google_map_key = "AIzaSyB_iyI-ZoAiV9j3HaHH58AEo62mXxOhL5Q";


const city = useSelector((state) => state.city.city);
const temp12Hour = useSelector((state) => state.Temp12Hour.TwelveHour);
const dispatch = useDispatch();
// console.log("IpCity", city);
// console.log("Temp12Hour", temp12Hour);

const [Inputcity, setInputCity] = useState("");
const [str, setStr] = useState("");
const [search, setSearch] = useState([]);
const [dp, setDp] = useState("");
const [changeBackground, setChangeBackground] = useState("black");
const [plainBackground, setPlainBackground] = useState("");
const [loaded, setLoaded] = useState(false);

//   the useEffect will run on the first rendering of the App component
//   after two seconds (about how long it takes for the data to load)
//   the loaded state will become true
  useEffect(() => {
    let timer = setTimeout(() => setLoaded(true), 7000);
    return () => {
      clearTimeout(timer);
    };
  }, []);



const handleCity = () => {
  dispatch(setCity(Inputcity));
  console.log("clicked on symbol");
  setDp("none");
}



const [sevenDayData, setSevenDayData] = useState("");
const [hourlyTemp, sethourlyTemp] = useState("");
const [sevenDaySunData, setSevenDaySunData] = useState("");



let map_url = `https://www.google.com/maps/embed/v1/search?key=${google_map_key}&q=${city}`;


const fetchIP = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

async function showPosition(position) {
  console.log("USer Allowed");

let IPtoken = "87e30487d2330d";

try{
  const res = await axios
        .get(`https://ipinfo.io/json?token=${IPtoken}`)
        .catch((err) => {
          console.log("Error ", err);
        });
  
      dispatch(setCity(res.data.city));

} catch(err) {
  console.log("Error", err);
}

}

}




useEffect(() => {

fetchIP();

},[]);




useEffect(() => {
  fetchLonLat();
}, [city]);





  
   const fetchLonLat = async () => {
    // console.log("In fetchLatLon");
    if(city !== undefined) {
      try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
        const response = await axios
              .get(url)
              .catch((err) => {
                console.log("Error ", err);
              });
  
      
        let longitude = await response.data.coord.lon;
        let lattitude = await response.data.coord.lat; 
        fetch_TwelveHour_Temp(lattitude,longitude);

      } catch(err) {
        console.log("Error", err);
      }
    }
   }


   // 24 hour temp forecast and sunrise sunset data

   const fetch_TwelveHour_Temp = async (lat,lon) => {

    try{
      let url24 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`;
    
      const response = await axios
            .get(url24)
            .catch((err) => {
              console.log("Error ",err);
            });
      //       let x = new Date((response.data.hourly[47].dt)*1000);
      //       x.toString();
      // console.log("24response", x);
      let HourlyData = await response.data.hourly;
      let temperatures = [];
      HourlyData.map((obj) => {
        temperatures.push(Math.floor(obj.temp));
      })
      // console.log("HELLO", temperatures);
      dispatch(setAllSevenData(response.data.daily));
      dispatch(set12Hour(temperatures));
    } catch(err) {
      console.log("Error", err);
    }
  
  }


  // useEffect(() => {
  //   fetchMe();
  // }, [str])

  
  // const fetchMe = () => {
  //   fetch(`https://spott.p.rapidapi.com/places/autocomplete?limit=20&skip=0&q=+${str}&type=CITY`, {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': '9e007d9903msh219bf5128f482f6p111a48jsn3651d0611401',
  //       'X-RapidAPI-Host': 'spott.p.rapidapi.com'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       setContainer(response);
  //       console.log(response)})
  //     .catch(err => console.error(err));
  // };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if(timer) clearTimeout(timer);
      timer =  setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    }
  } 


const handleChange = (event) => {
  
  setDp("block");

  const {value} = event.target;

  setInputCity(value);

  fetch(`https://spott.p.rapidapi.com/places/autocomplete?limit=20&skip=0&q=+${value}&type=CITY`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9e007d9903msh219bf5128f482f6p111a48jsn3651d0611401',
      'X-RapidAPI-Host': 'spott.p.rapidapi.com'
    }
  })
  .then(res => res.json())
  .then(response => {
    setSearch(response);
    // console.log("RESPONSE",response)
  })
  .catch(err => console.error(err));

};


const optimisedVersion = useCallback(debounce(handleChange), []);


const getCity = (e) => {
  // console.log("Clicked on city:" + e.target.innerText);
  dispatch(setCity(e.target.innerText));
  setDp("none");
}

const getPressCity = (e) => {
  if(e.charCode == 13) {
    // console.log("clicked on Enter key");
    dispatch(setCity(e.target.value));
  }
  setDp("none");
}

const plainClick1 = () => {
  setChangeBackground("");
  setPlainBackground("black");
} 

const plainClick2 = () => {
  setChangeBackground("");
  setPlainBackground("#9B0FDB")
}

const plainClick3 = () => {
  setChangeBackground("");
  setPlainBackground("#ffea00")
}

const plainClick4 = () => {
  setChangeBackground("");
  setPlainBackground("#04DB53")
}

const plainClick5 = () => {
  setChangeBackground("");
  setPlainBackground("#0F68DB")
}
 




  return (
   
    <>

    {city == undefined ? ( <h2 className='permission'> Please allow your location to use Weather App </h2> ) 
    : 
      !loaded && city!== undefined ?  ( <Loader /> ) : (
    <div className="App" style={{background: `url(${changeBackground})`, backgroundColor: plainBackground}}>
      {/* left fiv */}
       <div className='info'>

          <div className='inDiv'>
            <div className='searchBox'> 
                <div> <FontAwesomeIcon className='location' icon={faLocationDot} /> </div> 
                {/* onChange={(e) => setInputCity(e.target.value)} */}
                <div> <input onChange={optimisedVersion} onKeyPress={getPressCity} className='input' type="text" placeholder="Search"></input> </div> 
                <div> <FontAwesomeIcon onClick={handleCity} className='searchIcon' icon={faMagnifyingGlass} />  </div>
            </div>
      
          {search?.length > 0 && 
            <div className="searchResultBox" style={{display: dp}}>
              {search?.map((item,i) => 
                <div key={i} onClick={getCity} className="searchResultItem">
                  <span>{item.name}<FontAwesomeIcon className='locationInSearchResult' icon={faLocationDot} /> </span>
                </div>
              )}
            </div>
            }
        

             <SevenDay />
          

             <div className='graphs'>
              
              <TempAndImg />
             
             <div className='graphDiv'>  
                <ApexChartTemp />
            </div>

 
              <PressureAndHum />
            
              <SunriseSunset />
 

             <SunriseSetGraph />

    

            </div>      

          
          </div>
       </div>

       {/* right div */}
       <div className='map'>

          <iframe className='iframeBox' frameBorder={0} src={map_url} allowFullScreen>
          </iframe>

       </div>


      {/* control mobile */}
      <div className="whiteBorder">
      <div className="mobileControl">
        <div className="blackDesign"></div>
        {/* live clock */}
        <Clock/>
          {/* change background colour of screen */}
      <p className="txt">Change Background</p>
      <p className="dynamic">Dynamic backgrounds</p>
      <div className="coloursDiv">
            <span onClick={() => setChangeBackground("https://source.unsplash.com/800x1500/?beauty,nature,water")} className="color clr1"></span>
            <span onClick={() => setChangeBackground("https://source.unsplash.com/800x900/?ice,nature,water")} className="color clr2"></span>
            <span onClick={() => setChangeBackground("https://source.unsplash.com/800x1300/?rock,mountains,beach,desert,weather")} className="color clr3"></span>
            <span onClick={() => setChangeBackground("https://source.unsplash.com/800x1400/?himalaya,forest,waterfall,clouds")} className="color clr4"></span>
            <span onClick={() => setChangeBackground("https://source.unsplash.com/800x1200/?sea,nature,water,trees")} className="color clr5"></span>
      </div>
      <p className="plain">Plain backgrounds</p>
      <div className="coloursDiv2">
            <span onClick={plainClick1} className="color clr11"></span>
            <span onClick={plainClick2} className="color clr22"></span>
            <span onClick={plainClick3} className="color clr33"></span>
            <span onClick={plainClick4} className="color clr44"></span>
            <span onClick={plainClick5} className="color clr55"></span>
      </div>
      </div>
      </div>

     

    </div>
    )
     }


    </>
  
)
}


export default App;







