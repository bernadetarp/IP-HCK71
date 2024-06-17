import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'https://server.bernadetarp.site'
});

export default instance;