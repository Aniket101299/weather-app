import { combineReducers } from "redux";

import { cityReducer, sevenDayReducer } from "./reducers";

const allReducers = combineReducers({
    city: cityReducer,
    sevenDayData: sevenDayReducer
});

export default allReducers;