import { useSelector } from "react-redux";
import "./TempAndImg.css";

import rain from "../images/rain.png";
import mist from "../images/mist.png";
import cloud from "../images/clouds.png";
import clear from "../images/clear.png";
import haze from "../images/haze.png";


export default function TempAndImg() {

  const sevenData = useSelector((state) => state.sevenDayData.sevenDayData[0]);
  const clickData = useSelector((state) => state.onclickData.onclickData);
console.log("tempWea", sevenData);

// clickData == undefined ?     : `${clickData}`

    return (
        <>
       {/* {sevenData === undefined ? (<p>...Loading</p>) : (
              <div className='TempImg'>
                <div>{ `${sevenData.currentDayTemp}C` }</div>
                <div> <img src={sevenData.weather == "Clouds"? cloud : sevenData.weather == "Rain"? rain : sevenData.weather == "Clear"? clear : sevenData.weather == "Haze"? haze : mist}/> </div>
             </div> 
       )} */}

       {
        (clickData && 
              <div className='TempImg'>
                <div>{ `${clickData.currentDayTemp}C` }</div>
                <div> <img src={clickData.weather == "Clouds"? cloud : clickData.weather == "Rain"? rain : clickData.weather == "Clear"? clear : clickData.weather == "Haze"? haze : mist}/> </div>
              </div>) ||
       (sevenData &&  
              <div className='TempImg'>
                <div>{ `${sevenData.currentDayTemp}C` }</div>
                <div> <img src={sevenData.weather == "Clouds"? cloud : sevenData.weather == "Rain"? rain : sevenData.weather == "Clear"? clear : sevenData.weather == "Haze"? haze : mist}/> </div>
             </div> 
       )}


        </>
    )
}

