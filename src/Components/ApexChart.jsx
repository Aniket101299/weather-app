import React, {Component} from "react";
import Chart from 'react-apexcharts'
import "./ApexChart.css";

export default class ApexChartTemp extends Component {
    constructor(props) {
      
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
          series: [{
            name: 'Temperature',
            data: [`${Math.floor(props.hourlyTemp[0].temp)}°C`, Math.floor(props.hourlyTemp[1].temp), `${Math.floor(props.hourlyTemp[2].temp)}°C`, Math.floor(props.hourlyTemp[3].temp), Math.floor(props.hourlyTemp[4].temp), Math.floor(props.hourlyTemp[5].temp), Math.floor(props.hourlyTemp[6].temp), Math.floor(props.hourlyTemp[7].temp), Math.floor(props.hourlyTemp[8].temp),Math.floor(props.hourlyTemp[9].temp),Math.floor(props.hourlyTemp[10].temp),Math.floor(props.hourlyTemp[11].temp)]
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