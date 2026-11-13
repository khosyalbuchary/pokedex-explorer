import { useState } from 'react';

export default function SearchBar({ onSearch, onReset }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-8 flex max-w-xl flex-col gap-2 sm:flex-row"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari nama Pokémon (misal: pikachu)..."
        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 sm:flex-none"
        >
          Cari
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 sm:flex-none"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
