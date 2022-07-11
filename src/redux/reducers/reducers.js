import { ActionTypes } from "../constants/action-types";

const initialState = {
    sevenDayData: []
};

export const cityReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_CITY:
            return {...state, city: payload};
        default:
            return state;
    }
}

export const toDayReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TODAY:
            return {...state, TodayData: payload};
        default:
            return state;    
    }
}

export const sevenDayReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_SEVENDAY:
            return {...state, sevenDayData: payload};
        default:
            return state;    
    }
}

export const twelveHourReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_12_HOUR: 
            return {...state, TwelveHour: payload};
        default:
            return state;    
    }
}

