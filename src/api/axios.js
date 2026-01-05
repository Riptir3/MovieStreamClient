import axios from "axios";
import { removeSession, getSession } from "../session/Cookies";

const Axios = axios.create({baseURL: "https://localhost:7084/api"})

Axios.interceptors.request.use(
  (config) => {
    const token = getSession("Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response){
            const message = error.response.data?.message || "An error occurred.";
            if(error.response.status === 401){
                removeSession("Token")
                removeSession("User")
            }
            return Promise.reject({message});
        }
        return Promise.reject({message: "Server or Network Issue."})
    }
)

export default Axios;