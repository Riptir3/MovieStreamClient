import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7084/api", 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response){
            const message = error.response.data?.message || "An error occurred.";

            if(error.response.status === 401){
                localStorage.removeItem("token");
            }
            
            return Promise.reject({message});
        }

        return Promise.reject({message: "Server or Network Issue."})
    }
)

export default api;