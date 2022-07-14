import { combineReducers } from "redux";

import { cityReducer, sevenDayReducer, twelveHourReducer, toDayReducer, sunriseReducer, sunsetReducer, datesReducer } from "./reducers";


const allReducers = combineReducers({
    city: cityReducer,
    TodayData: toDayReducer,
    sevenDayData: sevenDayReducer,
    Temp12Hour: twelveHourReducer,
    sunriseData: sunriseReducer,
    sunsetData: sunsetReducer,
    datesData: datesReducer
});

export default allReducers;

