import { combineReducers } from "redux";

import { cityReducer, sevenDayReducer, twelveHourReducer, toDayReducer, sunriseReducer,
         sunsetReducer, datesReducer, onclickReducer, allSevenReducer, changableTempReducer } from "./reducers";


const allReducers = combineReducers({
    city: cityReducer,
    TodayData: toDayReducer,
    sevenDayData: sevenDayReducer,
    Temp12Hour: twelveHourReducer,
    sunriseData: sunriseReducer,
    sunsetData: sunsetReducer,
    datesData: datesReducer,
    onclickData: onclickReducer,
    allSevenData: allSevenReducer,
    changableTemp: changableTempReducer
});

export default allReducers;

