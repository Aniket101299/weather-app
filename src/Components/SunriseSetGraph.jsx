import React, {Component} from "react";
import Chart from 'react-apexcharts'
import "./SunriseSetGraph.css";

export default class SunriseSetGraph extends Component {
    constructor(props) {

// const [dates, setDates] = useState("");        

 let Data = props.sevenDaySunData;

 let arr = [];
 let sunriseData = [];
 let sunsetData = [];

 Data.forEach((Eachday) => {
    
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

    arr.push(dateOfGraph);


    const sunrise = new Date(Eachday.sunrise);
    const sunset = new Date(Eachday.sunset);
    let x = sunrise.toString();
    let y = sunset.toString();
  

    let rise = "";
    let set = "";
    for(let i=16; i<21; i++) {
        rise+= x[i];
        set+= y[i];
    }

    console.log("rise1",rise);
    console.log("set1",set);
  
//     let riseHour = "";
//     let setHour = ""; 
//     for(let i=0; i<2; i++) {
//         riseHour+= rise[i];
//     }
//     for(let i=0; i<2; i++) {
//       setHour+= set[i];
//   }

//     riseHour = +riseHour;
//     setHour = +setHour;
    
//     if(riseHour>12) {
//        riseHour = riseHour - 12;
//        rise = rise.substring(2);
//        rise = riseHour + rise;
//     } else {
//       rise = rise.substring(1);
//     }

//     if(setHour>12) {
//       setHour = setHour - 12;
//       set = set.substring(2);
//       set = setHour + set;
//     } else {
//       set = set.substring(1);
//     }


    


 })

//  setDates(arr);

console.log("props", props.sevenDaySunData);




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
              categories: [1,2,3,4,5,6,7,8,9,10,11,12]
            },
            stroke: {
              curve: 'smooth'
            },
            dataLabels: {
                enabled: false
            }
            
          },
          series: [{
            name: 'Sunrise',
            data:[1,2,3,4,5,6,7,8,9,10,11,12]
          },{
            name: 'Sunset',
            data:[1,2,3,4,5,6,7,8,9,10,11,12]
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