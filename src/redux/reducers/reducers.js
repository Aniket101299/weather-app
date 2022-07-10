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

export const sevenDayReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_SEVENDAY:
            return {...state, sevenDayData: payload};
        default:
            return state;    
    }
}

