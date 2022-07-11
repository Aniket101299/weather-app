import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setSevenDay } from "../redux/actions/actions";
import SetSevenDayData from "./SetSevenDayData";

// import "./SevenDay.css";

import rain from "../images/rain.png";
import mist from "../images/mist.png";
import cloud from "../images/clouds.png";
import clear from "../images/clear.png";
import haze from "../images/haze.png";

export default function SevenDay({data}) {

    let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";

    const city = useSelector((state) => state.city.city);

    console.log("seven", city);

    const dispatch = useDispatch();

    // const [res, setRes] = useState(
    //    [{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},
    //     {dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},
    //     {dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},
    //     {dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]},{dt:"",temp:{day:"",min:"", max:""},weather:[{main:""}]}
    //    ]
    // );

  

    // let lattitude = data.coord.lat;
    // let longitude = data.coord.lon;

    // console.log("componentData", data);
    
    
    const fetchCityLatLon = async () => {
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`;
        const response = await axios
              .get(url)
              .catch((err) => {
                console.log("Error ", err);
              });
    let longitude = response.data.coord.lon;
    let lattitude = response.data.coord.lat;    

    fetchSevenDay(longitude, lattitude);

        console.log("singleDay",response.data.coord);
    }


    const fetchSevenDay = async (lon, lat) => {
   
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`;
    
        const response = await axios
              .get(url)
              .catch((err) => {
                console.log("Error ", err);
              });

        let data = response.data.daily;
        
          // 7 Day data

          let sevenDay_Data = [];
      
      
          data.map((Eachday) => {
          
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
          
          });
        
          dispatch(setSevenDay(sevenDay_Data));

              console.log( "Seven" ,response.data.daily);

    }





    useEffect(() => {


    // user city weather
    
    fetchCityLatLon();

    // setData(res.data);
    // sevenDayFun(res.data.coord.lat,res.data.coord.lon);
    // twelveHourTemp(res.data.coord.lat,res.data.coord.lon);  
    

    console.log("hi inside useEffect");


        // axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${weather_key}&units=metric`)
        // .then((res) => console.log("sunRes",res.daily))
    //     let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${weather_key}&units=metric`;
    //     fetch(url)
    //     .then((responce) => responce.json())
    //     .then((res) => {
    //         console.log("sunRes", res.daily);
    //         setRes(res.daily);
    // });
    },[city])



      



    return (
        <>
         <div className="sevenDay"> 
        <SetSevenDayData />    
         </div> 
        </>
    )
}


