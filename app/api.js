// app/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // ← esta es tu IP real
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default api;
