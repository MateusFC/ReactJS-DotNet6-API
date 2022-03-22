import axios from 'axios'

const api = axios.create({
    baseURL : 'https://localhost:64739',
})


export default api;
