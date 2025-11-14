export const getAllMovie = async (axios) =>{
    const response = await axios.get(`/movie`);
    return response.data;
}

export const getMovie = async (axios,id) =>{
    const response = await axios.get(`/movie/${id}`);
    return response.data;
}
