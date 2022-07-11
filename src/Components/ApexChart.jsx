import React, {Component} from "react";
import { useEffect } from "react";
import Chart from 'react-apexcharts'
import { useSelector } from "react-redux";
// import "./ApexChart.css";

// export default class ApexChartTemp extends Component {

//     constructor(props) {
//       console.log("Props", props);
//         super(props);
//         this.state = {
//           options: {
//             chart: {
//                 type: 'area',
//                 zoom: {
//                   enabled: false
//                 }
//               },
//             xaxis: {
//               categories: [1,2,3,4,5,6,7,8,9,10,11,12]
//             },
//             yaxis: {
//               show: false,
//             },
//             stroke: {
//               curve: 'smooth'
//             },
//             dataLabels: {
//                 enabled: false
//             }
            
//           },
//           series: [{
//             name: 'Temperature',
//             // data: [`${Math.floor(props.temp12Hour[0].temp)}°C`, Math.floor(props.temp12Hour[1].temp),
//             //       `${Math.floor(props.temp12Hour[2].temp)}°C`, Math.floor(props.temp12Hour[3].temp), 
//             //       Math.floor(props.temp12Hour[4].temp), Math.floor(props.temp12Hour[5].temp), 
//             //       Math.floor(props.temp12Hour[6].temp), Math.floor(props.temp12Hour[7].temp),
//             //        Math.floor(props.temp12Hour[10].temp),Math.floor(props.temp12Hour[11].temp)
//             //       ]
//           }]
//         }
//       }


//     render() {
      
//         return (
//             <div className="chart">
//                  <Chart options={this.state.options} series={this.state.series} type="area" width={300} height={150} />
//             </div>
//         )
//     }
// }



const ApexChartTemp = () => {

 const temp12Hour = useSelector((state) => state.Temp12Hour.TwelveHour);

 console.log( "ApexChartTemp", temp12Hour);
 


// useEffect(() => {
//   console.log("inside use");
//   console.log( "InsideApex", temp12Hour);

// }, [temp12Hour]); 




    let  state = {
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
          yaxis: {
            show: false,
          },
          stroke: {
            curve: 'smooth'
          },
          dataLabels: {
              enabled: false
          }
          
        },
        // series: [{
        //   name: 'Temperature',
        //   // data: [12,54,65,74,45,65,12,32,44,66,77,14]
        //   data: [`${Math.floor(temp12Hour[0].temp)}°C`, Math.floor(temp12Hour[1].temp),
        //         `${Math.floor(temp12Hour[2].temp)}°C`, Math.floor(temp12Hour[3].temp), 
        //         Math.floor(temp12Hour[4].temp), Math.floor(temp12Hour[5].temp), 
        //         Math.floor(temp12Hour[6].temp), Math.floor(temp12Hour[7].temp),
        //          Math.floor(temp12Hour[10].temp),Math.floor(temp12Hour[11].temp)
        //         ]
        // }]
      }
    
 const tempData = () =>  {
  if(temp12Hour === undefined) {
    return ("...Loading"); 
  }  else {

  return (
    [{
      name: 'Temperature',
      // data: [12,54,65,74,45,65,12,32,44,66,77,14]
      data: [`${Math.floor(temp12Hour[0].temp)}°C`, Math.floor(temp12Hour[1].temp),
            `${Math.floor(temp12Hour[2].temp)}°C`, Math.floor(temp12Hour[3].temp), 
            Math.floor(temp12Hour[4].temp), Math.floor(temp12Hour[5].temp), 
            Math.floor(temp12Hour[6].temp), Math.floor(temp12Hour[7].temp),
             Math.floor(temp12Hour[10].temp),Math.floor(temp12Hour[11].temp)
            ]
    }]
  )
  }
}

 
    
      return (
          <div className="chart">
               {/* <Chart options={this.state.options} series={this.state.series} type="area" width={300} height={150} /> */}
               {/* <Chart options={state.options} series={state.series} type="area" width={300} height={150} /> */}
               <Chart options={state.options} series={tempData()} type="area" width={300} height={150} />
          </div>
      )
  
}

export default ApexChartTemp;