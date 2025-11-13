import api from "../api/axios";

export const register = async (username,email,password) =>{
    const response = await api.post(`/user/register`,{username,email,password});
    return response.data;
}

export const login = async (email,password) =>{
    const response = await api.post(`/user/login`,{email,password});
    return response.data;
}