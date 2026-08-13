import axios from 'axios'; // Import axios for API requests

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Attach server's api error message for easy frontend rendering
        if (error.response && error.response.data && error.response.data.message) {
            error.apiMessage = error.response.data.message;
        } else {
            error.apiMessage = error.message || 'Something went wrong';
        }

        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // Only redirect to login if we are not already on the login page to avoid infinite redirect loops
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
