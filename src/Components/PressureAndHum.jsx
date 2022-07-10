import "./PressureAndHum.css";

export default function PressureAndHum({data}) {

    return(
        <>
             <div className='pressureHumidity'>
                <div>
                  <p>Pressure</p>
                  <p>{data.main.pressure} hPa</p>
                </div>
                <div>
                  <p>Humidity</p>
                  <p>{data.main.humidity} %</p>
                </div>
              </div>
        </>
    )
}


  {/* <div className='pressureHumidity'>
                <div>
                  <p>Pressure</p>
                  <p>{data.main.pressure} hPa</p>
                </div>
                <div>
                  <p>Humidity</p>
                  <p>{data.main.humidity} %</p>
                </div>
              </div> */}