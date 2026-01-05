import Axios from "../api/axios"

export const getFavorites = async () => {
  const response = await Axios.get("/favorite");
  return response.data; 
};

export const addFavorite = async ( movieId) => {
  await Axios.post(`/favorite/add/${movieId}`);
};

export const removeFavorite = async ( movieId) => {
  await Axios.delete(`/favorite/remove/${movieId}`);
};