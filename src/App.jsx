import { useState, useEffect } from 'react';
import { getPokemonList, searchPokemonByName } from './services/pokeapi';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  // Loading, error, dan empty state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);

  // Fetch daftar + pagination
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
      setError('Gagal memuat data dari PokéAPI.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  // Handler pencarian nama persis & penanganan 404
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      fetchPokemons();
      return;
    }

    setLoading(true);
    setError('');
    setIsNotFound(false);

    try {
      const result = await searchPokemonByName(searchInput);
      setPokemons([result]);
      setNextUrl(null);
      setPrevUrl(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setIsNotFound(true);
        setPokemons([]);
      } else {
        setError('Terjadi kesalahan saat mencari Pokémon.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchInput('');
    fetchPokemons();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Pokédex Explorer (API & State Test)</h1>

      {/* Form tes fungsi pencarian */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Cari nama persis (misal: pikachu)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Cari</button>
        <button type="button" onClick={handleReset} style={{ padding: '8px 16px' }}>Reset</button>
      </form>

      {/* Loading State */}
      {loading && <p>Memuat data Pokémon...</p>}

      {/* Error State */}
      {!loading && error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={() => fetchPokemons()}>Coba Lagi</button>
        </div>
      )}

      {/* Empty State (404) */}
      {!loading && !error && isNotFound && (
        <p>Pokémon tidak ditemukan</p>
      )}

      {/* Render list data hasil fetch API */}
      {!loading && !error && !isNotFound && pokemons.length > 0 && (
        <div>
          <ul>
            {pokemons.map((pokemon) => (
              <li
                key={pokemon.id}
                onClick={() => setSelectedPokemon(pokemon)}
                style={{ cursor: 'pointer', marginBottom: '8px' }}
              >
                <strong>{pokemon.name}</strong> — Tipe:{' '}
                {pokemon.types.map((t) => t.type.name).join(', ')}
              </li>
            ))}
          </ul>

          {/* Navigasi Next & Previous */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button disabled={!prevUrl} onClick={() => fetchPokemons(prevUrl)}>
              Previous
            </button>
            <button disabled={!nextUrl} onClick={() => fetchPokemons(nextUrl)}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Tes state item terpilih */}
      {selectedPokemon && (
        <div style={{ marginTop: '20px', padding: '12px', border: '1px solid #ccc' }}>
          <h3>State Selected: {selectedPokemon.name}</h3>
          <p>Height: {selectedPokemon.height / 10} m | Weight: {selectedPokemon.weight / 10} kg</p>
          <button onClick={() => setSelectedPokemon(null)}>Tutup</button>
        </div>
      )}
    </div>
  );
}

export default App;