import axios from 'axios';
import Cookies from 'js-cookie'

export const getUserToken = () => {
    return "Bearer " + Cookies.get('userToken')
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": getUserToken()
    }
});


axiosInstance.interceptors.request.use(
    config => {
        // Add auth token to headers if available
        const token = Cookies.get('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return error.response;
    }
);


axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized, logging out ...');

        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
