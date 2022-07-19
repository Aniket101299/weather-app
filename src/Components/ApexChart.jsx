import React, {Component} from "react";
import { useEffect } from "react";
import Chart from 'react-apexcharts'
import { useSelector } from "react-redux";


const ApexChartTemp = () => {

  const temp12Hour = useSelector((state) => state.Temp12Hour.TwelveHour);
 
 console.log( "ApexChartTemp", temp12Hour);

const Graph = () => {
  return <> <Charts temp = {temp12Hour}/> </>
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
//              Math.floor(temp12Hour[10].temp),Math.floor(temp12Hour[11].temp),
//             ]
//     }]
//   )
//   }
// }

 
    
      return (
          <div className="chart">
               {/* <Chart options={state.options} series={tempData()} type="area" width={300} height={150} /> */}
               {temp12Hour && <Graph/> }
          </div>
      )
  
}

export default ApexChartTemp;


class Charts extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS", props.temp);
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
      series:  [{
        name: 'Temperature',
        data: [Math.floor(props.temp[0].temp), Math.floor(props.temp[1].temp),
              Math.floor(props.temp[2].temp), Math.floor(props.temp[3].temp), 
              Math.floor(props.temp[6].temp), Math.floor(props.temp[7].temp),
               Math.floor(props.temp[10].temp),Math.floor(props.temp[11].temp),
              ]
      }]
    }

  }

  render() {
    return (
      <Chart options={this.state.options} series={this.state.series} type="area" width={300} height={150} /> 
    )
  }

}