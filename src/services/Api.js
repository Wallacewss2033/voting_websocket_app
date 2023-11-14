import axios from 'axios';

const Api = axios.create({
    baseURL: process.env.API_URL.replace(/"/g, ""),
})

Api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Api.defaults.headers.common["Access-Control-Allow-Headers"] = "*";

export default Api;