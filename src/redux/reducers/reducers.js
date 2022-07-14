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
};

export const toDayReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TODAY:
            return {...state, TodayData: payload};
        default:
            return state;    
    }
};

export const sevenDayReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_SEVENDAY:
            return {...state, sevenDayData: payload};
        default:
            return state;    
    }
};


export const twelveHourReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_12_HOUR: 
            return {...state, TwelveHour: payload};
        default:
            return state;    
    }
};


export const datesReducer = (state = {}, {type, payload} ) => {
    switch (type) {
        case ActionTypes.SET_DATES:
            return {...state, dates: payload};
        default:
            return state;    
    }
};


export const sunriseReducer = (state = {}, {type, payload} ) => {
    switch (type) {
        case ActionTypes.SET_SUNRISE_DATA:
            return {...state, sunriseData: payload};
        default:
            return state;    
    }
};


export const sunsetReducer = (state = {}, {type, payload} ) => {
    switch (type) {
        case ActionTypes.SET_SUNSET_DATA:
            return {...state, sunsetData: payload};
        default:
            return state;     
    }
};

