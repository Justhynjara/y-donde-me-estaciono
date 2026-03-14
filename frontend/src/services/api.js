import axios from "axios";

const API = axios.create({
 baseURL: "http://localhost:3000/api"
});

export const getAvailability = (id) => {
 return API.get(`/parking/${id}/availability`);
};