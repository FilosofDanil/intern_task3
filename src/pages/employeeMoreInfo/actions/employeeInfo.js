import config from "../../../config";
import axios from "../../../misc/requests";
import {
    ERROR_RECEIVE_EMPLOYEE_BY_ID,
    RECEIVE_EMPLOYEE_BY_ID,
    CREATE_EMPLOYEE,
    ERROR_UPDATE_EMPLOYEE,
    ERROR_CREATE_EMPLOYEE,
    RECEIVE_COMPANY,
    ERROR_RECEIVE_COMPANY,
    UPDATE_EMPLOYEE_SUCCESS,
} from "../../../app/constants/actionTypes";

const receiveCreatedEmployee = (employee) => ({
    payload: employee,
    type: CREATE_EMPLOYEE,
});

const receiveEmployeeById = (employee) => ({
    payload: employee,
    type: RECEIVE_EMPLOYEE_BY_ID,
});

const errorEmployeeById = (errors) => ({
    payload: errors,
    type: ERROR_RECEIVE_EMPLOYEE_BY_ID,
});

const errorUpdateEmployee = (errors) => ({
    payload: errors,
    type: ERROR_UPDATE_EMPLOYEE,
});

const errorCreateEmployee = (errors) => ({
    payload: errors,
    type: ERROR_CREATE_EMPLOYEE,
});

const receiveCompanies = (employee) => ({
    payload: employee,
    type: RECEIVE_COMPANY,
});

const errorCompanies = (errors) => ({
    payload: errors,
    type: ERROR_RECEIVE_COMPANY,
});

const successfullyUpdated = () => ({
    type: UPDATE_EMPLOYEE_SUCCESS,
});

const getCompanies = () => {
    const {
        BACKEND_SERVICE,
    } = config;
    return axios.get(`${BACKEND_SERVICE}/api/v1/company`);
};

const getEmployeeById = (id) => {
    const { BACKEND_SERVICE } = config;
    return axios.get(`${BACKEND_SERVICE}/api/v1/employee/${id}`);
};

const updateEmployee = (id, data) => {
    const { BACKEND_SERVICE } = config;
    return axios.put(`${BACKEND_SERVICE}/api/v1/employee/${id}`, data);
};

const createEmployee = (data) => {
    const { BACKEND_SERVICE } = config;
    return axios.post(`${BACKEND_SERVICE}/api/v1/employee`, data);
};

const fetchEmployeeById = (id) => (dispatch) => {
    return getEmployeeById(id)
        .then(response => {
            const data = receiveEmployeeById(response);
            dispatch(data);
        })
        .catch(error => {
            dispatch(errorEmployeeById(error));
        });
};

const fetchUpdateEmployee = (id, data) => (dispatch) => {
    return updateEmployee(id, data)
        .then(response => {
            dispatch(receiveEmployeeById(data));
            dispatch(successfullyUpdated())
        })
        .catch(error => {
            dispatch(errorUpdateEmployee(error));
        });
};

const fetchCreateEmployee = (data) => (dispatch) => {
    return createEmployee(data)
        .then(response => {
            dispatch(receiveCreatedEmployee(response))
        })
        .catch(error => {
            dispatch(errorCreateEmployee(error));
        });
};

const fetchCompanies = () => (dispatch) => {
    return getCompanies()
        .then(response => {
                const data = receiveCompanies(response);
                dispatch(data);
            }
        )
        .catch(error => {
            dispatch(errorCompanies(error))
        });
};

const exportFunctions = {
    fetchEmployeeById,
    fetchUpdateEmployee,
    fetchCreateEmployee,
    fetchCompanies,
};

export default exportFunctions;
