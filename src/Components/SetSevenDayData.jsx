import { useEffect, useState } from "react";
import "./SetSevenDayData.css";

import rain from "../images/rain.png";
import mist from "../images/mist.png";
import cloud from "../images/clouds.png";
import clear from "../images/clear.png";
import haze from "../images/haze.png";


export default function SetSevenDayData({res}) {

    console.log("RES", res);
    let data = res;
        
         const [sevenDayData, setSevenDayData] = useState(
            [{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},
             {name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},
             {name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},
             {name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""}
            ]
         );
      

         useEffect(() => {

          // 7 Day data

          let sevenDay_Data = [];
      
      
          data.map(function(Eachday) {
          
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
          
          console.log("weekData", sevenDay_Data);
          
          setSevenDayData(sevenDay_Data);
         },[res]);



    return (
        <>
               <div className='sevenDay'>

 <div>
   <p>{`${sevenDayData[0].name}`}</p>
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




        </>
    )
}