import axios from "axios";

/**
 * The API URL is defined in the .env file.
 * It uses https://dummyjson.com/docs/todos to fetch the data.
 */
const api = axios.create({
    baseURL: `${process.env.REACT_APP_URL}`,
    headers: {
        "Content-type": "application/json"
    }
})

export default api;