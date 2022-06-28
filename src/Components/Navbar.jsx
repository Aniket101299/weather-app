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