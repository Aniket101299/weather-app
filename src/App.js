import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {

  let key = "e03c2e0135a0e9ca1c601f3f18d309f2";

  // Weather of a city 
  let longitude;
  let lattitude;
  async function getWeather() {
  
  try{
      
  let city = document.getElementById("city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  
  let res = await fetch(url);   // data came but in the form of stream 
  let data = await res.json();  // we collect the data here in bucket 
  console.log(data);
  
  
  let temp = data.main.temp;
  
  temp = Math.round(temp-273);   // another way is add '&units=metric' in url and it will convert kelvin to degree centigrade
  
  // console.log(temp + "°C");
  
  // let display = document.getElementById("temp");
  // display.innerHTML = `<h1>Temperature of ${city} : ${temp} °C </h1>`;
  

  return (
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
          <iframe className='iframe'>
          </iframe>
       </div>
    </div>
  );
}

export default App;
