import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401 && error.response.data.message === 'Token has expired') {
            try {
                const refreshResponse = await api.get('/auth/refresh');
                return api(error.config);
            } catch (refreshError) {
                console.error('Error during token refresh:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (request) => request,
    async (error) => {
        if (error.response && error.response.status === 401 && error.response.data.message === 'Token has expired') {
            try {
                const refreshRequest = await api.get('/auth/refresh');
                return api(error.config);
            } catch (refreshError) {
                console.error('Error during token refresh:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;