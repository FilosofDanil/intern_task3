import {RECEIVE_PROFILE,} from "../../../app/constants/actionTypes";

const initialState = {
    profile: {},
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };

        default: {
            return state;
        }
    }
}