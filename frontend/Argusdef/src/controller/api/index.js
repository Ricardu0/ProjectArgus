import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // ou o endereço do seu backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// injeta token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// trata 401/403 globalmente (opcional)
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err.response?.status;
        if (status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // opcional: redirecionar para login
            // window.location.href = "/login";
        }
        return Promise.reject(err);
    } );

export default api;
