import axios from 'axios';
import Cookies from 'js-cookie'

const getUserToken = () => {
    return "Bearer " + Cookies.get('adminToken')
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/admin',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": getUserToken()
    }
});

axiosInstance.interceptors.request.use(
    config => {
        // Add auth token to headers if available
        const token = Cookies.get('adminToken');
        console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    response =>  response,
    error => {
        console.error('Error:', error.message);
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized, logging out ...');
        }
        return error.response;
    }
);

export default  axiosInstance