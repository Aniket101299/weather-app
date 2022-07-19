import { ActionTypes } from "../constants/action-types";

export const setCity = (city) => {
    return {
        type: ActionTypes.SET_CITY,
        payload: city
    };
};


export const setToDay = (ToDay) => {
    return {
        type: ActionTypes.SET_TODAY,
        payload: ToDay
    }; 
};

export const setSevenDay = (sevenDay) => {
    return {
        type: ActionTypes.SET_SEVENDAY,
        payload: sevenDay
    }; 
};


export const set12Hour = (TwelveHour) => {
    return {
        type: ActionTypes.SET_12_HOUR,
        payload: TwelveHour
    }
};

export const setDates = (dates) => {
    return {
        type: ActionTypes.SET_DATES,
        payload: dates
    }
};

export const setSunrise = (sunrise) => {
    return {
        type: ActionTypes.SET_SUNRISE_DATA,
        payload: sunrise
    }
};

export const setSunset = (sunset) => {
    return {
        type: ActionTypes.SET_SUNSET_DATA,
        payload: sunset
    }
};

export const setOnclick = (onclickData) => {
    return {
        type: ActionTypes.SET_ONCLICK,
        payload: onclickData
    }
};

export const setAllSevenData = (seven) => {
    return {
        type: ActionTypes.SET_ALL_SEVEN_DATA,
        payload: seven
    }
};