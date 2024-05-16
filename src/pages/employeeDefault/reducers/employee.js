import {
    RECEIVE_EMPLOYEES,
    ERROR_RECEIVE_EMPLOYEES,
    DELETED_EMPLOYEE, ERROR_DELETE_EMPLOYEE,
} from '../../../app/constants/actionTypes';

const initialState = {
    employeeList: [],
    totalPages: 0,
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

        case ERROR_RECEIVE_EMPLOYEES: {
            return {
                ...state,
                isLoaded: false,
            };
        }

        case DELETED_EMPLOYEE: {
            return {
                ...state,
                deleteEmployee: {
                    isDeleted: true,
                    counter: state.deleteEmployee.counter + 1,
                    id: action.payload,
                }
            }
        }

        case ERROR_DELETE_EMPLOYEE: {
            return {
                ...state,
                deleteEmployee: {
                    isDeleted: false,
                    counter: state.deleteEmployee.counter + 1
                }
            }
        }

        default: {
            return state;
        }
    }
}