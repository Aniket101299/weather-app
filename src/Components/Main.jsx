import "../Components/Main.css"
import { BsFillSunFill } from 'react-icons/bs';
import { MdNightsStay } from 'react-icons/md';
import axios from "axios";
import { useEffect, useState } from "react";

export const Main = ({value})=>{


      const [data2 , setData2] = useState({       
        daily:[{dt:"",temp:{day:"",night:""}},{dt:"",temp:{day:"",night:""}},{dt:"",temp:{day:"",night:""}},{dt:"",temp:{day:"",night:""}},{dt:"",temp:{day:"",night:""}}],        
      });

    const [data1, setData1] = useState({
        main:{temp:"",temp_min:"",temp_max:"",feels_like:"",humidity:""},
        name:"",
        weather:[{main:""}],
        visibility:"",
         wind:{speed:""},
    });

   
  let z = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAWelLTPW340QBxVkEDipz0q9cODb0T8GI&q=${value!=""? value:"Delhi"}`;


    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=06e57ae98533ae7240b4a10cfa49e0ee&units=metric`)
        .then((res) => {setData1({...res.data})            
            cityWeekInfo(res.data.coord.lat,res.data.coord.lon)
        });
        
    },[value]);
// let a = "1654583400"
// console.log(a.toDateString())


function convert(d){
    var myDate = new Date(d*1000);

     return(day(myDate.toDateString()));

}

function day(z){
  return (z.split(" ")[0])
}



function convert2(d){
    var myDate = new Date(d*1000);

     return(day2(myDate.toDateString()));

}

function day2(z){
    return (z.split(" ")[2]+" "+z.split(" ")[1]+" "+ z.split(" ")[3])
  }


useEffect(()=>{
    axios.get("https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=06e57ae98533ae7240b4a10cfa49e0ee&units=metric")
    .then((res) => {setData1({...res.data})
        cityWeekInfo(res.data.coord.lat,res.data.coord.lon)
    }); 
    
    
},[]);  


async function cityWeekInfo(latitude, longitude) {
    
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=b3dfaeaf2defd23abad8ac8117387f27&units=metric`
    try {
        let responce = await fetch(url);
        let data = await responce.json();       
        
        setData2(data);
    }
    catch (err) {
        console.log(err)
    }

}
    


    return(
        <div className="main">
           <div className="first-container">
               <div className="box-1">
                   <h3>{data1.name!=""&&data1.name}</h3>
                   <h1>{data1.main.temp!=""&&data1.main.temp}<sup>o</sup>C</h1>
                   <h3>{data1.weather[0].main!=""&&data1.weather[0].main}</h3>
               </div>
               <div className="box-2">
                   <p>Felt Temp. - {data1.main.feels_like!=""&&data1.main.feels_like}<sup>o</sup>C</p>
                   <p>Humidity - {data1.main.humidity!=""&&data1.main.humidity}%</p>
                   <p>Wind - {data1.wind.speed!=""&&data1.wind.speed} km/h</p>
                   <p>Visibility - {data1.visibility!=""&&data1.visibility/1000} Km</p>
                   <p>Max Temp. - {data1.main.temp_max!=""&&data1.main.temp_max}<sup>o</sup>C</p>
                   <p>Min Temp. {data1.main.temp_min!=""&&data1.main.temp_min}<sup>o</sup>C</p>
               </div>
               <div className="box-3">                
                           <iframe className="iframe"
                                 src={z}>
                           </iframe>      
               </div>
           </div>
           <div className="second-container">
               <div className="small-box">
               <p>{data2.daily[0].dt!=""&&convert(data2.daily[0].dt)}</p>
               <p>{data2.daily[0].dt!=""&&convert2(data2.daily[0].dt)}</p>
                   <p><BsFillSunFill /> {data2.daily[0].temp.day!=""&&data2.daily[0].temp.day}<sup>o</sup>C</p>
                   <p><MdNightsStay /> {data2.daily[0].temp.night!=""&&data2.daily[0].temp.night}<sup>o</sup>C</p>
                  
               </div>
               <div className="small-box">
               <p>{data2.daily[1].dt!=""&&convert(data2.daily[1].dt)}</p>
               <p>{data2.daily[1].dt!=""&&convert2(data2.daily[1].dt)}</p>
                   <p><BsFillSunFill />{data2.daily[1].temp.day!=""&&data2.daily[1].temp.day}<sup>o</sup>C</p>
                   <p><MdNightsStay /> {data2.daily[1].temp.night!=""&&data2.daily[1].temp.night}<sup>o</sup>C</p>
                   
               </div>
               <div className="small-box">
               <p>{data2.daily[2].dt!=""&&convert(data2.daily[2].dt)}</p>
               <p>{data2.daily[2].dt!=""&&convert2(data2.daily[2].dt)}</p>
                   <p><BsFillSunFill /> {data2.daily[2].temp.day!=""&&data2.daily[2].temp.day}<sup>o</sup>C</p>
                   <p><MdNightsStay /> {data2.daily[2].temp.night!=""&&data2.daily[2].temp.night}<sup>o</sup>C</p>
                 
               </div>
               <div className="small-box">
               <p>{data2.daily[3].dt!=""&&convert(data2.daily[3].dt)}</p>
               <p>{data2.daily[3].dt!=""&&convert2(data2.daily[3].dt)}</p>
                   <p><BsFillSunFill /> {data2.daily[3].temp.day!=""&&data2.daily[3].temp.day}<sup>o</sup>C</p>
                   <p><MdNightsStay /> {data2.daily[3].temp.night!=""&&data2.daily[3].temp.night}<sup>o</sup>C</p>
                
               </div>
               <div className="small-box">


                   <p>{data2.daily[4].dt!=""&&convert(data2.daily[4].dt)}</p>
                   <p>{data2.daily[4].dt!=""&&convert2(data2.daily[4].dt)}</p>
                   <p><BsFillSunFill /> {data2.daily[4].temp.day!=""&&data2.daily[4].temp.day}<sup>o</sup>C</p>
                   <p><MdNightsStay /> {data2.daily[4].temp.night!=""&&data2.daily[4].temp.night}<sup>o</sup>C</p>
                
               </div>
           </div>
        </div>
    )
}