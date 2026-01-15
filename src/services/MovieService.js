import Axios from "../api/axios"

export const getAllMovie = async () =>{
    const response = await Axios.get(`/movie`);
    return response.data;
}

export const getMovie = async (id) =>{
    const response = await Axios.get(`/movie/${id}`);
    return response.data;
}

export const createMovie = async (data) =>{
    const response = await Axios.post(`/movie`,data);
    return response.data;
}

export const updateMovie = async (id,data) =>{
    const response = await Axios.put(`/movie/${id}`,data);
    return response.data;
}

export const deleteMovie = async (id) =>{
    const response = await Axios.delete(`/movie/${id}`);
    return response.data;
}

export const getActiveMovieRequest = async () =>{
    const response = await Axios.get(`/movierequest`);
    return response.data;
}

export const updateMovieRequest = async ( id, status) => {
  const response = await Axios.put(`/movierequest/${id}?status=${status}`);
  return response;
};

export const createMovieRequest = async ( data) =>{
    const response = await Axios.post(`/movierequest/send`,{...data});
    return response.data;
}

export const getActiveMovieReport = async () =>{
    const response = await Axios.get(`/moviereport`);
    return response.data;
}

export const updateMovieReport = async ( id, status) =>{
    const response = await Axios.put(`/moviereport/${id}?status=${status}`);
    return response;
}

export const createMovieReport = async (movieId, comment) =>{
    const response = await Axios.post(`/moviereport/create`,{
        movieId: movieId,
        comment: comment
    });
    return response.data;
}


