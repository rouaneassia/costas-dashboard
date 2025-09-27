import axios from "axios";

// Create axios instance
export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    withXSRFToken:true
});