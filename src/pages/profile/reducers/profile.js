import {AUTH_ERROR, RECEIVE_PROFILE,} from "../../../app/constants/actionTypes";

const initialState = {
    profile: {},
    isAuth: true
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_PROFILE:
            return {
                ...state,
                profile: action.payload,
                isAuth: true,
            };
        case AUTH_ERROR:
            return {
                ...state,
                isAuth: false,
            };

        default: {
            return state;
        }
    }
}