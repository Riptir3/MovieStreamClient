import Axios from "../api/axios";

export const registerUser = async (username,email,password) =>{
    const response = await Axios.post(`/user/register`,{username,email,password});
    return response.data;
}

export const loginUser = async (email,password) =>{
    const response = await Axios.post(`/user/login`,{email,password});
    return response.data;
}