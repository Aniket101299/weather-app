import { ActionTypes } from "../constants/action-types";

export const setCity = (city) => {
    return {
        type: ActionTypes.SET_CITY,
        payload: city
    };
};

export const setSevenDay = (sevenDay) => {
    return {
        type: ActionTypes.SET_SEVENDAY,
        payload: sevenDay
    }; 
};