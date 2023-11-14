import Api from "./Api";

export default {

    async get(endpoint, headers = {}) {
        const response = await Api.get(endpoint,'',headers);
        return response.data;
    },

    async post(endpoint, data, header = {}) {
        const response = await Api.post(endpoint, data, header);
        return response.data;
    },
}