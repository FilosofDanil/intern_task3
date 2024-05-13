import {ERROR_RECEIVE_EMPLOYEES, RECEIVE_EMPLOYEES} from "../../../app/constants/actionTypes";
import config from "../../../config";
import axios from "../../../misc/requests";

const receiveEmployees = (employees) => ({
    payload: employees,
    type: RECEIVE_EMPLOYEES,
});

const errorEmployees = (errors) => ({
    payload: errors,
    type: ERROR_RECEIVE_EMPLOYEES,
});


const getEmployees = () => {
    const {
        BACKEND_SERVICE,
    } = config;
    return axios.get(`${BACKEND_SERVICE}/api/employee`);
};

const fetchEmployees = () => (dispatch) => {
    return getEmployees()
        .then(response => dispatch(receiveEmployees(response.data)))
        .catch(error => dispatch(errorEmployees(error)));
};

const fetchAddEmployee = () => (dispatch) => {

};

const fetchUpdateEmployee = () => (dispatch) => {

};

const fetchDeleteEmployee = () => (dispatch) => {

};

const exportFunctions = {
    fetchEmployees,
    fetchAddEmployee,
    fetchUpdateEmployee,
    fetchDeleteEmployee,
};

export default exportFunctions;
