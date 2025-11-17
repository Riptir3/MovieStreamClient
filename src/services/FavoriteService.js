export const getFavorites = async (axios) => {
  const response = await axios.get("/favorite");
  return response.data; 
};

export const addFavorite = async (axios, movieId) => {
  await axios.post(`/favorite/add/${movieId}`);
};

export const removeFavorite = async (axios, movieId) => {
  await axios.delete(`/favorite/remove/${movieId}`);
};