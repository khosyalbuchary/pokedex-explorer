const TYPE_COLORS = {
  grass: 'bg-green-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400 text-slate-900',
  bug: 'bg-lime-600',
  normal: 'bg-slate-400',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  fairy: 'bg-pink-400',
  fighting: 'bg-orange-700',
  psychic: 'bg-pink-600',
  rock: 'bg-stone-500',
  ghost: 'bg-indigo-700',
  ice: 'bg-cyan-400 text-slate-900',
  dragon: 'bg-violet-700',
  dark: 'bg-zinc-800',
  steel: 'bg-slate-500',
  flying: 'bg-sky-400',
};

export default function PokemonCard({ pokemon, onSelect }) {
  const imageUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <div
      onClick={onSelect}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold capitalize text-slate-800">
          {pokemon.name}
        </h2>
        <span className="text-xs font-semibold text-slate-400">
          #{String(pokemon.id).padStart(3, '0')}
        </span>
      </div>

      <div className="my-2 flex h-36 items-center justify-center rounded-lg bg-slate-50 p-2">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="h-32 w-32 object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-xs text-slate-400">Tidak ada gambar</span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {pokemon.types.map((item) => {
          const typeName = item.type.name;
          const badgeColor = TYPE_COLORS[typeName] || 'bg-slate-500';
          return (
            <span
              key={typeName}
              className={`rounded-full px-3 py-0.5 text-xs font-medium capitalize text-white ${badgeColor}`}
            >
              {typeName}
            </span>
          );
        })}
      </div>
    </div>
  );
}
