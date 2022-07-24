import { useState, useEffect } from "react";

function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return <>
      <div className="timeArea">
            <div className="time"> {`${date.getHours() >= 13 ? date.getHours() % 12 : date.getHours()}:${date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()}`} <span className="am-pm">{date.getHours() >=12 ? "PM" : "AM"}</span> </div>
            <div className="place-container">
              <div className="time-zone">Asia/Kolkata</div>
              <div className="country">IN</div>
            </div>
     </div>
            <div className="date"> {`${date.getDay() === 1 ? "Monday"
                 : date.getDay() === 2 ? "Tuesday" : date.getDay() === 3 ? "Wednesday" : date.getDay() === 4 ? "Thursday"
                  : date.getDay() === 5 ? "Friday" : date.getDay() === 6 ? "Saturday" : "Sunday"}, 
                  ${date.getDate()} ${date.getMonth() === 0 ? "January" : date.getMonth() === 1 ? "February"
                  : date.getMonth() === 2 ? "March" : date.getMonth() === 3 ? "April" : date.getMonth() === 4 ? "May"
                   : date.getMonth() === 5 ? "June" : date.getMonth() === 6 ? "July" : date.getMonth() === 7 ? "August"
                    : date.getMonth() === 8 ? "September" : date.getMonth() === 9 ? "October"
                     : date.getMonth() === 10 ? "November" : "December" }`} 
            </div>
  </>;
}

export default Clock;
