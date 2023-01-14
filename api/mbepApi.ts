import axios from 'axios';

/* Creating a new instance of axios with a baseURL of /api. */
const mbepApi = axios.create({
    baseURL: '/api'
});

export default mbepApi;