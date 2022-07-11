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
