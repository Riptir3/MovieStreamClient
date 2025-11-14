
export const registerUser = async (axios,username,email,password) =>{
    const response = await axios.post(`/user/register`,{username,email,password});
    return response.data;
}

export const loginUser = async (axios,email,password) =>{
    const response = await axios.post(`/user/login`,{email,password});
    return response.data;
}