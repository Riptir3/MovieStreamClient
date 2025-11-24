export const getAllMovie = async (axios) =>{
    const response = await axios.get(`/movie`);
    return response.data;
}

export const getMovie = async (axios,id) =>{
    const response = await axios.get(`/movie/${id}`);
    return response.data;
}

export const createMovie = async (axios,data) =>{
    const response = await axios.post(`/movie`,data);
    return response.data;
}

export const updateMovie = async (axios,data) =>{
    const response = await axios.put(`/movie`,data);
    return response.data;
}

export const deleteMovie = async (axios,id) =>{
    const response = await axios.delete(`/movie/${id}`);
    return response.data;
}

export const createMovieRequest = async (axios, data) =>{
    const response = await axios.post(`/movierequest/send`,{...data});
    return response.data;
}

export const createMovieReport = async (axios, movieId, comment) =>{
    const response = await axios.post(`/moviereport/create`,{
        movieId: movieId,
        comment: comment
    });
    return response.data;
}
