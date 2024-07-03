import config from "../../../config";
import axios from "../../../misc/requests";
import {AUTH_ERROR, ERROR_CREATE_EMPLOYEE, RECEIVE_PROFILE} from "../../../app/constants/actionTypes";

const receiveProfile = (profile) => ({
    payload: profile,
    type: RECEIVE_PROFILE,
});

const errorGetProfile = (errors) => ({
    payload: errors,
    type: AUTH_ERROR,
});

const getProfile = () => {
    const {
        BACKEND_SERVICE,
    } = config;
    return axios.get(`${BACKEND_SERVICE}/api/profile`, {withCredentials: true});
};

const fetchProfile = (id) => (dispatch) => {
    return getProfile()
        .then(response => {
            const data = receiveProfile(response);
            dispatch(data);
        })
        .catch(error => {
            dispatch(errorGetProfile(error));
        });
};

const exportFunctions = {
   fetchProfile
};

export default exportFunctions;