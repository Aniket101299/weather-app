import { useSelector } from "react-redux";
import "./TempAndImg.css";

import rain from "../images/rain.png";
import mist from "../images/mist.png";
import cloud from "../images/clouds.png";
import clear from "../images/clear.png";
import haze from "../images/haze.png";


export default function TempAndImg() {

  // const data = [];
  const sevenData = useSelector((state) => state.sevenDayData.sevenDayData[0]);
console.log("tempWea", sevenData);
// var renderTemp;
// sevenData === undefined ? (<p>...Loading</p>) : (const { currentDayTemp, weather } = sevenData;)
  
  // console.log("currentDayTemp", currentDayTemp);
  //  renderTemp = () => {
  //   return (
  //      <div className='TempImg'>
  //           <div>{`${currentDayTemp}C`}</div>
  //           <div> <img src={weather == "Clouds"? cloud : weather == "Rain"? rain : weather == "Clear"? clear : weather == "Haze"? haze : mist}/> </div>
  //       </div> 
  //   )
  // }

  // const { currentDayTemp, weather } = sevenData;
  // data.push(currentDay);

//   sevenData.length === 0 ? (<p>...Loading</p>) : (
//     var currentDay = useSelector((state) => state.sevenDayData.sevenDayData[0])
// )
  // const renderTemp = data.map((day) => {
  //   const { currentDayTemp, weather } = day;
  //   return (
  //       <div className='TempImg'>
  //           <div>{`${currentDayTemp}C`}</div>
  //           <div> <img src={weather == "Clouds"? cloud : weather == "Rain"? rain : weather == "Clear"? clear : weather == "Haze"? haze : mist}/> </div>
  //       </div> 
  //   )
  // });
  // const { currentDayTemp, weather } = currentDay;

    return (
        <>
       {sevenData === undefined ? (<p>...Loading</p>) : (
              <div className='TempImg'>
                <div>{`${sevenData.currentDayTemp}C`}</div>
                <div> <img src={sevenData.weather == "Clouds"? cloud : sevenData.weather == "Rain"? rain : sevenData.weather == "Clear"? clear : sevenData.weather == "Haze"? haze : mist}/> </div>
             </div> 
       )}



        {/* {renderTemp} */}
        </>
    )
}


  {/* <div className='TempImg'>
                <div>{`${sevenDayData[0].currentDayTemp}C`}</div>
                <div> <img src={sevenDayData[0].weather == "Clouds"? cloud : sevenDayData[0].weather == "Rain"? rain : sevenDayData[0].weather == "Clear"? clear : sevenDayData[0].weather == "Haze"? haze : mist}/> </div>
              </div> */}