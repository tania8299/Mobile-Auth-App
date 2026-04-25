import axios from "axios";

const API = axios.create({
    baseURL: "https://d32xhep9w9ay4f.cloudfront.net/api/v3",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const sendOtp = (data) => API.post("/otp-send", data);
export const login = (data) => API.post("/login", data);
export const registerUser = (data) =>
    API.post("/register", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
export const getProfile = () =>
    API.get("/post?postDetail&user_id=90344");

export default API;