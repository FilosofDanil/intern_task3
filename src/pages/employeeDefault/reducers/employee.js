import {
    RECEIVE_EMPLOYEES,
    ERROR_RECEIVE_EMPLOYEES,
    REQUEST_COMPANY,
    RECEIVE_COMPANY,
    ERROR_RECEIVE_COMPANY,
} from '../../../app/constants/actionTypes';

const initialState = {
    minSalary: '',
    maxSalary: '',
    name: '',
    companyName:'',
    employeeList: [],
    errors: [],
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_EMPLOYEES: {
            return {
                ...state,
                employeeList: action.payload,
            };
        }

        case ERROR_RECEIVE_EMPLOYEES:{
            return {
                ...state,
            };
        }
        case REQUEST_COMPANY: {
            return {
                ...state,
            };
        }

        case RECEIVE_COMPANY: {
            return {
                ...state,
            };
        }

        case ERROR_RECEIVE_COMPANY:{
            return {
                ...state,
            };
        }
        default: {
            return state;
        }
    }
}