import React, {Component} from "react";
import Chart from 'react-apexcharts'
import "./SunriseSetGraph.css";

 
export default class SunriseSetGraph extends Component {


constructor(props) {
     
// console.log("props",props.sevenDaySunData);
let latlon = props.sevenDaySunData;
let lattitude = latlon[0];
let longitude = latlon[1];
let weather_key = "e03c2e0135a0e9ca1c601f3f18d309f2";

let arr = [];
let sunData = [];
let dates = [];
let sunriseData = [];
let sunsetData = [];



let url7Day = `http://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${weather_key}&units=metric`;

fetch(url7Day)
.then(res => res.json())
.then(data => {

 let Data = data.daily;

Data.forEach((Eachday,i) => {
    
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
    // console.log("wday", wday);

    let dateOfGraph = "";
    for(let i=4; i<wday.length; i++) {
        dateOfGraph = dateOfGraph + wday[i];
    }

    localStorage.setItem(`date${i}`, JSON.stringify(dateOfGraph));
    // arr.push(dateOfGraph);

    // console.log(dateOfGraph);

    
 let url1 = `https://api.sunrise-sunset.org/json?lat=${lattitude}&lng=${longitude}&date=${dateOfGraph}&formatted=0`;

 fetch(url1)
 .then(res => res.json())
 .then(data => {
// console.log("data",data);
    const sunrise = new Date(data.results.sunrise);
    const sunset = new Date(data.results.sunset);
    let x = sunrise.toString();
    let y = sunset.toString();
    let rise = "";
    let set = "";
    for(let i=16; i<21; i++) {
        rise+= x[i];
        set+= y[i];
    }
 
    let riseHour = "";
    let setHour = ""; 

    for(let i=0; i<2; i++) {
        riseHour+= rise[i];
    }

    for(let i=0; i<2; i++) {
      setHour+= set[i];
    }

    riseHour = +riseHour;
    setHour = +setHour;

    if(riseHour>12) {
        riseHour = riseHour - 12;
        rise = rise.substring(2);
        rise = riseHour + rise;
     } else {
        rise = rise.substring(1);
     }
 
     if(setHour>12) {
       setHour = setHour - 12;
       set = set.substring(2);
       set = setHour + set;
     } else {
       set = set.substring(1);
     }

     let newRise = "";
     let newSet = "";

     for(let i=0; i<rise.length; i++) {
        if(rise[i] == ":") {
            newRise+=  ".";
        } else {
            newRise+= rise[i];
        }
     }

     
     for(let i=0; i<set.length; i++) {
        if(set[i] == ":") {
            newSet+=  ".";
        } else {
            newSet+= set[i];
        }
     }


      newRise = +newRise;
      newSet = +newSet;
    
localStorage.setItem(`sunrise${i}`, JSON.stringify(newRise));
localStorage.setItem(`sunset${i}`, JSON.stringify(newSet));

    //   sunriseData.push(newRise);
    //   sunsetData.push(newSet);
    //  console.log("rise1", newRise);
    //  console.log("set1",newSet);

})

 })

})




//  let url1 = `https://api.sunrise-sunset.org/json?lat=${lattitude}&lng=${longitude}&date=${one}&formatted=0`;

//  fetch(url1)
//  .then(res => res.json())
//  .then(data => {
// // console.log("data",data);
//     const sunrise = new Date(data.results.sunrise);
//     const sunset = new Date(data.results.sunset);
//     let x = sunrise.toString();
//     let y = sunset.toString();
//     let rise = "";
//     let set = "";
//     for(let i=16; i<21; i++) {
//         rise+= x[i];
//         set+= y[i];
//     }
 
//     let riseHour = "";
//     let setHour = ""; 

//     for(let i=0; i<2; i++) {
//         riseHour+= rise[i];
//     }

//     for(let i=0; i<2; i++) {
//       setHour+= set[i];
//     }

//     riseHour = +riseHour;
//     setHour = +setHour;

//     if(riseHour>12) {
//         riseHour = riseHour - 12;
//         rise = rise.substring(2);
//         rise = riseHour + rise;
//      } else {
//         rise = rise.substring(1);
//      }
 
//      if(setHour>12) {
//        setHour = setHour - 12;
//        set = set.substring(2);
//        set = setHour + set;
//      } else {
//        set = set.substring(1);
//      }

//      let newRise = "";
//      let newSet = "";

//      for(let i=0; i<rise.length; i++) {
//         if(rise[i] == ":") {
//             newRise+=  ".";
//         } else {
//             newRise+= rise[i];
//         }
//      }

     
//      for(let i=0; i<set.length; i++) {
//         if(set[i] == ":") {
//             newSet+=  ".";
//         } else {
//             newSet+= set[i];
//         }
//      }


//       newRise = +newRise;
//       newSet = +newSet;

//      console.log("rise1", newRise);
//      console.log("set1",newSet);

// })























// let requests = arr.map(date => {
//     // create a promise for each API call 
//     return new Promise((resolve, reject) => {
//         request({
//             uri: `https://api.sunrise-sunset.org/json?lat=${lattitude}&lng=${longitude}&date=${date}&formatted=0`,
//             method: 'GET'
//         },
//         (err, res, body) => {
//             if(err) {
//                 reject(err);
//             }
//         })
//     }) 
// })

// Promise.all(requests).then((body) => {
//     body.forEach(res => {
//         if(res) {
//             sunData.push(JSON.parse(res))
//         }
//     })
// }).catch(err => console.log(err))






// async function getSunVal(date) {
//     let url = `https://api.sunrise-sunset.org/json?lat=${lattitude}&lng=${longitude}&date=${date}&formatted=0`;

//     try{
//     let res = await fetch(url);
//     let data = await res.json();
    
    
//     const sunrise = new Date(data.results.sunrise);
//     const sunset = new Date(data.results.sunset);
//     let x = sunrise.toString();
//     let y = sunset.toString();
//     let rise = "";
//     let set = "";
//     for(let i=16; i<21; i++) {
//         rise+= x[i];
//         set+= y[i];
//     }
 
//     let riseHour = "";
//     let setHour = ""; 

//     for(let i=0; i<2; i++) {
//         riseHour+= rise[i];
//     }

//     for(let i=0; i<2; i++) {
//       setHour+= set[i];
//     }

//     riseHour = +riseHour;
//     setHour = +setHour;

//     if(riseHour>12) {
//         riseHour = riseHour - 12;
//         rise = rise.substring(2);
//         rise = riseHour + rise;
//      } else {
//         rise = rise.substring(1);
//      }
 
//      if(setHour>12) {
//        setHour = setHour - 12;
//        set = set.substring(2);
//        set = setHour + set;
//      } else {
//        set = set.substring(1);
//      }

//      let newRise = "";
//      let newSet = "";

//      for(let i=0; i<rise.length; i++) {
//         if(rise[i] == ":") {
//             newRise+=  ".";
//         } else {
//             newRise+= rise[i];
//         }
//      }

     
//      for(let i=0; i<set.length; i++) {
//         if(set[i] == ":") {
//             newSet+=  ".";
//         } else {
//             newSet+= set[i];
//         }
//      }


//       newRise = +newRise;
//       newSet = +newSet;

//      console.log("rise1", newRise);
//      console.log("set1",newSet);
   
//     } catch(err) {
//       console.log(err.message);
//     }
//   }





// console.log("arr", arr[0]);
// console.log("sunriseData", sunriseData[5]);
// console.log("sunsetData", sunsetData[3]);


// let x = localStorage.getItem(JSON.parse("dates"));
// let y = localStorage.getItem(JSON.parse("sunrise"));
// let z = localStorage.getItem(JSON.parse("sunset"));

// console.log("x",x);
// console.log("y",y);
// console.log("z",z);

let one = localStorage.getItem(JSON.parse("date0"));
let two = localStorage.getItem(JSON.parse("date1"));
let three = localStorage.getItem(JSON.parse("date2"));
let four = localStorage.getItem(JSON.parse("date3"));
let five = localStorage.getItem(JSON.parse("date4"));
let six = localStorage.getItem(JSON.parse("date5"));
let seven = localStorage.getItem(JSON.parse("date6"));
let eight = localStorage.getItem(JSON.parse("date7"));

let rise1 = localStorage.getItem(JSON.parse("sunrise0"));
let rise2 = localStorage.getItem(JSON.parse("sunrise1"));
let rise3 = localStorage.getItem(JSON.parse("sunrise2"));
let rise4 = localStorage.getItem(JSON.parse("sunrise3"));
let rise5 = localStorage.getItem(JSON.parse("sunrise4"));
let rise6 = localStorage.getItem(JSON.parse("sunrise5"));
let rise7 = localStorage.getItem(JSON.parse("sunrise6"));
let rise8 = localStorage.getItem(JSON.parse("sunrise7"));

let set1 = localStorage.getItem(JSON.parse("sunset0"));
let set2 = localStorage.getItem(JSON.parse("sunset1"));
let set3 = localStorage.getItem(JSON.parse("sunset2"));
let set4 = localStorage.getItem(JSON.parse("sunset3"));
let set5 = localStorage.getItem(JSON.parse("sunset4"));
let set6 = localStorage.getItem(JSON.parse("sunset5"));
let set7 = localStorage.getItem(JSON.parse("sunset6"));
let set8 = localStorage.getItem(JSON.parse("sunset7"));



        super(props);
     
        this.state = {
          options: {
            chart: {
                type: 'area',
                zoom: {
                  enabled: false
                }
              },
            xaxis: {
              categories: [one,two,three,four,five,six,seven,eight],
              labels: {
                rotate: -15,
                rotateAlways: true
            }
          },
            stroke: {
              curve: 'smooth'
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100]
                  },
              }
            }, 
          series: [{
            name: 'Sunrise',
            data:[rise1,rise2,rise3,rise4,rise5,rise6,rise7,rise8]
          },{
            name: 'Sunset',
            data:[set1,set2,set3,set4,set5,set6,set7,set8]
          }]
        }
      }

   
    render() {
        return (
            <div className="chart">
                 <Chart options={this.state.options} series={this.state.series} type="area" width={300} height={150} />
            </div>
        )
    }
}


