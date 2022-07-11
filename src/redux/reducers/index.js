import { combineReducers } from "redux";

import { cityReducer, sevenDayReducer, twelveHourReducer, toDayReducer } from "./reducers";

const allReducers = combineReducers({
    city: cityReducer,
    TodayData: toDayReducer,
    sevenDayData: sevenDayReducer,
    Temp12Hour: twelveHourReducer,
});

export default allReducers;