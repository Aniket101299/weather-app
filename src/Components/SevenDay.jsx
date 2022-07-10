import { useState, useEffect } from "react";
import axios from "axios";
import SetSevenDayData from "./SetSevenDayData";

import "./SevenDay.css";

import rain from "../images/rain.png";
import mist from "../images/mist.png";
import cloud from "../images/clouds.png";
import clear from "../images/clear.png";
import haze from "../images/haze.png";

export default function SevenDay({data}) {

    let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";

    const [res, setRes] = useState(
       [{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},
        {dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},
        {dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},
        {dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]}
       ]
    );

  

    let lattitude = data.coord.lat;
    let longitude = data.coord.lon;

    // console.log("componentData", data);

    useEffect(() => {
console.log("hi inside useEffect");
        // axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${weather_key}&units=metric`)
        // .then((res) => console.log("sunRes",res.daily))
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${weather_key}&units=metric`;
        fetch(url)
        .then((responce) => responce.json())
        .then((res) => {
            console.log("sunRes", res.daily);
            setRes(res.daily);
    });
    },[data])



      



    return (
        <>
        <h2>Seven Day</h2>
        {/* <div className="sevenDay"> 
       
         </div> */}

        <SetSevenDayData res={res}/>    

        </>
    )
}


