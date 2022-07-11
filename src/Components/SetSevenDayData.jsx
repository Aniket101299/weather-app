import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
// import "./SetSevenDayData.css";

import rain from "../images/rain.png";
import mist from "../images/mist.png";
import cloud from "../images/clouds.png";
import clear from "../images/clear.png";
import haze from "../images/haze.png";


export default function SetSevenDayData() {

  const sevenData = useSelector((state) => state.sevenDayData.sevenDayData);

  console.log("reduxData", sevenData);

  const renderSeven = sevenData.map((day) => {
  const { name, minTemp, maxTemp, weather, currentDayTemp } = day;

  return (
  <div>
    <p>{name}</p>
    <span>{minTemp}</span>
    <span>{maxTemp}</span>
    <img src={weather == "Clouds"? cloud : weather == "Rain"? rain : weather == "Clear"? clear : weather == "Haze"? haze : mist}/>
    <p>{weather}</p>
  </div>
  )

  })
        
        //  const [sevenDayData, setSevenDayData] = useState(
        //     [{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},
        //      {name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},
        //      {name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},
        //      {name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""},{name: "",minTemp:"",maxTemp:"",weather: "",currentDayTemp: ""}
        //     ]
        //  );
      

       



    return (
        <>

        
          {renderSeven}
        
               {/* <div className='sevenDay'>

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

             </div>        */}




        </>
    )
}