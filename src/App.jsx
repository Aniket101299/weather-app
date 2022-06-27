import './App.css';
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

import { Navbar } from './Components/Navbar';
import { Main } from './Components/Main';


function App() {

let key = "e03c2e0135a0e9ca1c601f3f18d309f2";
const [city, setCity] = useState("");
const [call, setCall] = useState("");
const [data, setData] = useState("");
const handleCity = (e) => {
  const {value} = e.target.value;
  setCity(value);
}

const getData = () => {
  setCall("callApi");
}

useEffect(()=> {
// Weather of a city 
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(url)
    .then((res) => setData(res.data))
},[call]);


const [item2, setItem2] = useState("");

function getItemParent(x){
    setItem2(x);
}

let map_key = "AIzaSyB_iyI-ZoAiV9j3HaHH58AEo62mXxOhL5Q";
let map_url = `https://www.google.com/maps/embed/v1/search?key=${map_key}&q=${"satara"}`;


  return (
    <>
    <div className="App">
      {/* left fiv */}
       <div className='info'>
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








