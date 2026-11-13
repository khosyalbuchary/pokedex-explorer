import { useState, useEffect } from 'react';
import { getPokemonList, searchPokemonByName } from './services/pokeapi';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import Pagination from './components/Pagination';
import PokemonDetailModal from './components/PokemonDetailModal';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);

  const fetchPokemons = async (url = '/pokemon?limit=20&offset=0') => {
    setLoading(true);
    setError('');
    setIsNotFound(false);

    try {
      const data = await getPokemonList(url);
      setPokemons(data.pokemons);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat daftar Pokémon.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchPokemons();
      return;
    }

    setLoading(true);
    setError('');
    setIsNotFound(false);

    try {
      const result = await searchPokemonByName(query);
      setPokemons([result]);
      setNextUrl(null);
      setPrevUrl(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setIsNotFound(true);
        setPokemons([]);
      } else {
        setError('Gagal mencari Pokémon. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Pokédex Explorer
          </h1>
        </header>

        <SearchBar onSearch={handleSearch} onReset={() => fetchPokemons()} />

        {loading && (
          <p className="my-12 text-center text-slate-600">
            Memuat data Pokémon...
          </p>
        )}

        {!loading && error && (
          <div className="my-12 text-center">
            <p className="mb-3 text-red-600">{error}</p>
            <button
              onClick={() => fetchPokemons()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && isNotFound && (
          <p className="my-12 text-center font-medium text-slate-600">
            Pokémon tidak ditemukan
          </p>
        )}

        {!loading && !error && !isNotFound && pokemons.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {pokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onSelect={() => setSelectedPokemon(pokemon)}
                />
              ))}
            </div>

            <Pagination
              prevUrl={prevUrl}
              nextUrl={nextUrl}
              onNavigate={(url) => fetchPokemons(url)}
            />
          </>
        )}

        {selectedPokemon && (
          <PokemonDetailModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;