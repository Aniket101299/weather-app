import './App.css';
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

import { Navbar } from './Components/Navbar';
import { Main } from './Components/Main';


function App() {

let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";
let google_map_key = "AIzaSyB_iyI-ZoAiV9j3HaHH58AEo62mXxOhL5Q";


const [city, setCity] = useState("");
const [call, setCall] = useState("");
const [data, setData] = useState("");
const [permission, setPermission] = useState(false);

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
setPermission(true);
}



},[]);



useEffect(()=> {
  // Weather of a city 
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
      axios.get(url)
      .then((res) => setData(res.data))
  },[call]);




useEffect(() => {
  let IPtoken = "87e30487d2330d";

  axios.get(`https://ipinfo.io/json?token=${IPtoken}`)
  .then((res) => {
    if(permission == true) {
      setCity(res.data.city);
    }
  })
  
},[permission]);

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
         <h1>{permission? city:"not allowed"} </h1>
          <div className='inDiv'>
            <div className='searchBox'> 
                <div> <FontAwesomeIcon className='location' icon={faLocationDot} /> </div> 
                <div> <input className='input' placeholder='Search'></input> </div> 
                <div> <FontAwesomeIcon className='searchIcon' icon={faMagnifyingGlass} />  </div>
            </div>
            <div className='sevenDay'></div>
            <div className='graphs'></div>
          </div>
       </div>

       {/* right div */}
       <div className='map'>
          <iframe className='iframeBox' frameBorder={0} src={map_url} allowFullScreen>
          </iframe>
       </div>
    </div>
    }

    <div className="AppComponent">    
    <Navbar getItemParent = {getItemParent}/>
    <Main value = {item2}/>
  </div>




<div className="search">   
<input type="text" value={city} onChange={handleCity} className="city" placeholder="enter city"/>
<button onClick={() => getData}>Search</button>  
</div>

<div>Data:{data}</div>

</>
  
)
}

export default App;








