import {
    CREATE_EMPLOYEE, ERROR_CREATE_EMPLOYEE, ERROR_UPDATE_EMPLOYEE,
    RECEIVE_COMPANY,
    RECEIVE_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE_SUCCESS
} from '../../../app/constants/actionTypes';

const initialState = {
    employee:{},
    companies: [],
    isCreated: false,
    update: {
        isUpdated: false,
        counter: 0,
    } ,
    create: {
        isCreated: false,
        counter: 0,
    } ,
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_EMPLOYEE_BY_ID: {
            return {
                ...state,
                employee: action.payload,
            };
        }

        case CREATE_EMPLOYEE: {
            return {
                ...state,
                employee: action.payload,
                create:{
                    isCreated: true,
                    counter: state.create.counter+1,
                }
            };
        }
        case UPDATE_EMPLOYEE_SUCCESS:{
            return {
                ...state,
                update:{
                    isUpdated: true,
                    counter: state.update.counter+1,
                }
            }
        }

        case ERROR_CREATE_EMPLOYEE:{
            return {
                ...state,
                create:{
                    isCreated: false,
                    counter: state.create.counter+1,
                }
            }
        }

        case ERROR_UPDATE_EMPLOYEE:{
            return {
                ...state,
                update:{
                    isUpdated: false,
                    counter: state.update.counter+1,
                }
            }
        }

        case RECEIVE_COMPANY:{
            return {
              ...state,
              companies: action.payload
            };
        }

        default: {
            return state;
        }
    }
}