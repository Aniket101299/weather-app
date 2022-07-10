import "./TempAndImg.css";

import rain from "../images/rain.png";
import mist from "../images/mist.png";
import cloud from "../images/clouds.png";
import clear from "../images/clear.png";
import haze from "../images/haze.png";

export default function TempAndImg({sevenDayData}) {

    return (
        <>
             <div className='TempImg'>
                <div>{`${sevenDayData[0].currentDayTemp}C`}</div>
                <div> <img src={sevenDayData[0].weather == "Clouds"? cloud : sevenDayData[0].weather == "Rain"? rain : sevenDayData[0].weather == "Clear"? clear : sevenDayData[0].weather == "Haze"? haze : mist}/> </div>
             </div>
        </>
    )
}


  {/* <div className='TempImg'>
                <div>{`${sevenDayData[0].currentDayTemp}C`}</div>
                <div> <img src={sevenDayData[0].weather == "Clouds"? cloud : sevenDayData[0].weather == "Rain"? rain : sevenDayData[0].weather == "Clear"? clear : sevenDayData[0].weather == "Haze"? haze : mist}/> </div>
              </div> */}