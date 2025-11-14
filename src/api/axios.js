import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export function useAxios(){
const {token, logout} = useContext(UserContext);

const instance = axios.create({
  baseURL: "https://localhost:7084/api", 
});

instance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response){
            const message = error.response.data?.message || "An error occurred.";

            if(error.response.status === 401){
                logout();
            }
            
            return Promise.reject({message});
        }

        return Promise.reject({message: "Server or Network Issue."})
    }
)

return instance;
}