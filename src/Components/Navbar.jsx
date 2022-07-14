import { useState } from "react";
import "../Components/Navbar.css";


export const Navbar = ({getItemParent}) => {

    const [item , setItem] = useState("");

    // let curr = () => {
    //     console.log("hi");
    // }
    function curr() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          }
    }

    function showPosition(position) {

  let loca = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=true&key=AIzaSyA0zKLtY0TCm_NpVoAhcRtHEFeTsuMDLCY`;
     
  console.log( "loca", loca);

}


    return(
        <div className="nav">
            <div>
            <input onChange={(e)=>(setItem(e.target.value))} className="search" type="text" />
            <button onClick={()=>{getItemParent(item)}}  className="btn">Search</button>
            <button className="btn1" onClick={curr}>Current Location</button>
            </div>
            
        </div>
    )
}








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
   },[]);
   