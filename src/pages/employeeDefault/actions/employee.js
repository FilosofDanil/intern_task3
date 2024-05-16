import {
    DELETED_EMPLOYEE, ERROR_DELETE_EMPLOYEE,
    ERROR_RECEIVE_EMPLOYEES,
    RECEIVE_EMPLOYEES
} from "../../../app/constants/actionTypes";
import config from "../../../config";
import axios from "../../../misc/requests";

const receiveEmployees = (content) => ({
    payload: content,
    type: RECEIVE_EMPLOYEES,
});

const errorEmployees = (errors) => ({
    payload: errors,
    type: ERROR_RECEIVE_EMPLOYEES,
});

const deletedEmployee = (id) => ({
    type: DELETED_EMPLOYEE,
    payload: id,
})

const errorDeleteEmployee = () => ({
    type: ERROR_DELETE_EMPLOYEE,
})

const getEmployees = (param, filters) => {
    const {
        BACKEND_SERVICE,
    } = config;
    return axios.get(`${BACKEND_SERVICE}/api/employee/_list?page=${param}
    &salaryFrom=${filters.minSalary}&salaryTo=${filters.maxSalary}
    &name=${filters.name}&surname=${filters.surname}`);
};

const deleteEmployee = (id) => {
    const {
        BACKEND_SERVICE,
    } = config;
    return axios.delete(`${BACKEND_SERVICE}/api/employee/${id}`)
        .then(status => {
            console.log(status)
            return status;
        })
}


const fetchEmployees = (page, filter) => (dispatch) => {
    return getEmployees(page, filter).then(response => {
            const data = receiveEmployees(response);
            dispatch(data);
        }
    ).catch(error => {
            dispatch(errorEmployees(error))
        });

};

const fetchDeleteEmployee = (id) => (dispatch) => {
    return deleteEmployee(id)
        .then(response => {
                dispatch(deletedEmployee(id))
            }
        )
        .catch(error => {
            dispatch(errorDeleteEmployee())
        });
}

const exportFunctions = {
    fetchEmployees,
    fetchDeleteEmployee
};

export default exportFunctions;
