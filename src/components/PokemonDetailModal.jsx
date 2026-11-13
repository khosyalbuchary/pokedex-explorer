export default function PokemonDetailModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  // 1. Ambil gambar artwork resmi dengan fallback front_default
  const imageUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default;

  // 2. Konversi satuan: desimeter -> meter, hektogram -> kilogram
  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  return (
    // Overlay gelap di belakang modal (klik area gelap untuk menutup)
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
    >
      {/* Kotak Konten Modal (stopPropagation agar klik di dalam modal tidak menutup modal) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        {/* Tombol Tutup (X) */}
        <button
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-red-100 hover:text-red-600"
        >
          ✕
        </button>

        {/* Header: Gambar, Nomor ID, Nama & Tipe */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold tracking-wider text-slate-400">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <h2 className="mt-1 text-2xl font-bold capitalize text-slate-800">
            {pokemon.name}
          </h2>

          {imageUrl && (
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="my-3 h-40 w-40 object-contain drop-shadow-md sm:h-48 sm:w-48"
            />
          )}

          {/* Badge Tipe Pokémon */}
          <div className="flex flex-wrap justify-center gap-2">
            {pokemon.types.map((item) => (
              <span
                key={item.type.name}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-700"
              >
                {item.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tinggi & Berat */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-center">
          <div>
            <p className="text-xs text-slate-500">Tinggi (Height)</p>
            <p className="mt-1 text-base font-bold text-slate-800">
              {heightInMeters} m
            </p>
          </div>
          <div className="border-l border-slate-200">
            <p className="text-xs text-slate-500">Berat (Weight)</p>
            <p className="mt-1 text-base font-bold text-slate-800">
              {weightInKg} kg
            </p>
          </div>
        </div>

        {/* Kemampuan (Abilities) */}
        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Abilities
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {pokemon.abilities.map((item) => (
              <span
                key={item.ability.name}
                className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium capitalize text-slate-700"
              >
                {item.ability.name.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Statistik Dasar (Stats) */}
        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Base Stats
          </h3>
          <div className="mt-3 space-y-3">
            {pokemon.stats.map((item) => {
              const statName = item.stat.name.replace('-', ' ');
              const statValue = item.base_stat;
              // Hitung persentase bar (maksimal base stat umum ~200)
              const percentage = Math.min((statValue / 200) * 100, 100);

              return (
                <div key={item.stat.name}>
                  <div className="mb-1 flex justify-between text-xs font-medium">
                    <span className="uppercase text-slate-600">{statName}</span>
                    <span className="font-bold text-slate-800">{statValue}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tombol Tutup Bawah (Memudahkan pengguna mobile) */}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-slate-800 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Tutup Detail
        </button>
      </div>
    </div>
  );
}