import {
    RECEIVE_EMPLOYEES,
    ERROR_RECEIVE_EMPLOYEES,
    RECEIVE_COMPANY,
    ERROR_RECEIVE_COMPANY, DELETED_EMPLOYEE, ERROR_DELETE_EMPLOYEE,
} from '../../../app/constants/actionTypes';

const initialState = {
    employeeList: [],
    totalPages: 0,
    errors: [],
    deleteEmployee: {
        isDeleted: false,
        id: 0,
        counter: 0,
    },
    isLoaded: true,
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_EMPLOYEES: {
            return {
                ...state,
                employeeList: action.payload.content,
                totalPages: action.payload.totalPages
            };
        }

        case ERROR_RECEIVE_EMPLOYEES:{
            return {
                ...state,
                isLoaded: false,
            };
        }

        case DELETED_EMPLOYEE:{
            return {
                ...state,
                deleteEmployee: {
                    isDeleted: true,
                    counter: state.deleteEmployee.counter+1,
                    id: action.payload,
                }
            }
        }

        case ERROR_DELETE_EMPLOYEE:{
            return {
                ...state,
                deleteEmployee: {
                    isDeleted: false,
                    counter: state.deleteEmployee.counter+1
                }
            }
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
        //
        // case CHANGE_FILTER: {
        //     return {
        //         ...state,
        //         minSalary: action.payload.minSalary,
        //         maxSalary: action.payload.maxSalary,
        //         name: action.payload.name,
        //         companyName: action.payload.companyName,
        //     };
        // }
        //
        // case FILTER_EMPLOYEES: {
        //     return {
        //         ...state,
        //         minSalary: action.payload.minSalary,
        //         maxSalary: action.payload.maxSalary,
        //         name: action.payload.name,
        //         companyName: action.payload.companyName,
        //         employeeList: action.payload,
        //     };
        // }

        default: {
            return state;
        }
    }
}