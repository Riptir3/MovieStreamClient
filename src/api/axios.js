import axios from "axios";
import { removeSession, getSession } from "../session/Cookies";

const Axios = axios.create({
  baseURL: "https://localhost:7084/api",
  headers: {"Content-Type": "application/json"}})

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
          const serverMessage = typeof error.response.data === 'string' 
              ? error.response.data 
              : error.response.data?.message;

          if(error.response?.status === 401){
              removeSession("Token")
              removeSession("User")
          }
          
          else if(error.response){
            return Promise.reject(serverMessage);
          }
          else if(error.request){
                return Promise.reject({message: "Server or Network issue!"});
          }
    return Promise.reject(serverMessage);
    }
)

export default Axios;