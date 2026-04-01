import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://skillswap-l8ii.onrender.com/api'
});

// Add a request interceptor to add the token to headers
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
