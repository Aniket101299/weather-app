import React, {Component} from "react";
import { useState } from "react";
import Chart from 'react-apexcharts';
import { useSelector } from "react-redux";


const ApexChartTemp = () => {

  const temp12Hour = useSelector((state) => state.Temp12Hour.TwelveHour);
 
 console.log( "ApexChartTemp", temp12Hour);

//  const [temperature, setTemperature] = useState([]); 

//  setTemperature(temp12Hour);
let  state; 
if(temp12Hour !== undefined) {
  state = {
      options: {
        chart: {
            type: 'area',
            zoom: {
              enabled: false
            }
          },
        xaxis: {
          categories: [1,2,3,4,5,6,7,8,9,10,11,12],
        },
        yaxis: {
          show: false,
        },
        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
            enabled: false
        },
        subtitle: {
          text: 'Hourly Temperature Movements',
          align: 'left',
        }
      },
      series:   [{
        name: 'Temperature',
        data: [temp12Hour[0],temp12Hour[1],
                temp12Hour[2],temp12Hour[3], 
                temp12Hour[4],temp12Hour[5], 
                temp12Hour[6],temp12Hour[7],
                temp12Hour[8],temp12Hour[9],
                temp12Hour[10],temp12Hour[11],
              ]
      }]
     
    }
}
    
//  const tempData = () =>  {
//   if(temp12Hour === undefined) {
//     return ("...Loading"); 
//   }  else {
//   return (
//     [{
//       name: 'Temperature',
//       data: [Math.floor(temp12Hour[0].temp), Math.floor(temp12Hour[1].temp),
//             Math.floor(temp12Hour[2].temp), Math.floor(temp12Hour[3].temp), 
//             Math.floor(temp12Hour[4].temp), Math.floor(temp12Hour[5].temp), 
//             Math.floor(temp12Hour[6].temp), Math.floor(temp12Hour[7].temp),
//             Math.floor(temp12Hour[8].temp),Math.floor(temp12Hour[9].temp),
//              Math.floor(temp12Hour[10].temp),Math.floor(temp12Hour[11].temp),
//             ]
//     }]
//         [{
//           name: 'Temperature',
//           data: [temp12Hour[0],temp12Hour[1],
//                   temp12Hour[2],temp12Hour[3], 
//                   temp12Hour[4],temp12Hour[5], 
//                   temp12Hour[6],temp12Hour[7],
//                   temp12Hour[8],temp12Hour[9],
//                   temp12Hour[10],temp12Hour[11],
//                 ]
//         }]
//   )
//   }
// }

 
    
      return (
          <div className="chart">
               <Chart options={state.options} series={state.series} type="area" width={300} height={150} />
          </div>
      )
  
}

export default ApexChartTemp; 