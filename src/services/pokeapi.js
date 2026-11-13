import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemonList = async (url = '/pokemon?limit=20&offset=0') => {
  const listResponse = await api.get(url);
  const { results, next, previous } = listResponse.data;

  const detailResponses = await Promise.all(
    results.map((pokemon) => axios.get(pokemon.url))
  );

  return {
    pokemons: detailResponses.map((res) => res.data),
    next,
    previous,
  };
};

export const searchPokemonByName = async (name) => {
  const formattedName = name.trim().toLowerCase();
  const response = await api.get(`/pokemon/${formattedName}`);
  return response.data;
};