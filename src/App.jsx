import React, { useEffect, useMemo, useState } from 'react';

const HeartIcon = ({ isFavorite }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 transition-colors duration-300 ${isFavorite ? 'text-rose-400 fill-current' : 'text-slate-400 group-hover:text-white'}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

const BlockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors duration-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

const UnblockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-400 group-hover:text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const DetailsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors duration-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

function UserModal({ user, onClose }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!user) return null;

  const { street, city, state, country, postcode } = user.location;
  const fullAddress = `${street.number} ${street.name}, ${city}, ${state}, ${country} ${postcode}`;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div
        className="bg-slate-900/90 border border-slate-700 rounded-2xl shadow-2xl p-8 w-full max-w-xl m-4 relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl" aria-label="Cerrar">
          &times;
        </button>
        <div className="text-center">
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-cyan-400 object-cover"
            src={user.picture.large}
            alt="Profile"
          />
          <h2 className="text-3xl font-bold">{user.name.first} {user.name.last}</h2>
          <p className="text-cyan-300 break-words">{user.email}</p>
        </div>
        <div className="mt-6 border-t border-slate-800 pt-6 space-y-4 text-lg">
          <p><strong className="font-semibold text-slate-300">Género:</strong> <span className="text-slate-300 capitalize">{user.gender}</span></p>
          <p><strong className="font-semibold text-slate-300">Dirección:</strong> <span className="text-slate-300">{fullAddress}</span></p>
          <p><strong className="font-semibold text-slate-300">Teléfono:</strong> <span className="text-slate-300">{user.phone}</span></p>
          <p><strong className="font-semibold text-slate-300">Celular:</strong> <span className="text-slate-300">{user.cell}</span></p>
          <p><strong className="font-semibold text-slate-300">Edad:</strong> <span className="text-slate-300">{user.dob.age} años</span></p>
        </div>
      </div>
    </div>
  );
}

function UserCard({ user, isFavorite, isBlocked, onFavorite, onBlock, onUnblock, onDetails }) {
  const cardAccent = isBlocked ? 'from-rose-500/10 to-red-900/20 border-rose-400/50' : isFavorite ? 'from-amber-400/10 to-yellow-900/20 border-amber-300/70' : 'from-cyan-400/10 to-blue-900/20 border-slate-700';
  const badgeText = isBlocked ? 'Bloqueado' : isFavorite ? 'Favorito' : 'Disponible';
  const badgeColor = isBlocked ? 'text-rose-300 bg-rose-500/10 border border-rose-400/40' : isFavorite ? 'text-amber-200 bg-amber-500/10 border border-amber-300/40' : 'text-cyan-200 bg-cyan-500/10 border border-cyan-300/40';

  return (
    <div className={`relative border rounded-2xl p-5 text-left shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br ${cardAccent}`}>
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500" />
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            className={`w-20 h-20 rounded-2xl border-4 border-slate-800 object-cover shadow-md ${isBlocked ? 'grayscale' : ''}`}
            src={user.picture.large}
            alt={`Foto de perfil de ${user.name.first} ${user.name.last}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/128x128/0f172a/ffffff?text=Error';
            }}
          />
          <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[11px] font-semibold rounded-full ${badgeColor}`}>
            {badgeText}
          </span>
        </div>
        <div className="flex-grow space-y-1">
          <h2 className="text-xl font-bold text-white leading-tight">{user.name.first} {user.name.last}</h2>
          <p className="text-slate-300 text-sm flex items-center gap-2 break-all">
            <span className="inline-flex items-center justify-center bg-slate-800/60 px-2 py-1 rounded-md text-[11px] uppercase tracking-wide">{user.gender}</span>
            {user.location.country}
          </p>
          <p className="text-slate-400 text-sm">{user.email}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800/70">
        <div className="text-sm text-slate-300">{user.location.city}, {user.location.state}</div>
        <div className="flex gap-2">
          {isBlocked ? (
            <button
              onClick={() => onUnblock(user.login.uuid)}
              className="p-2 rounded-full bg-slate-800/70 hover:bg-emerald-600/40 text-emerald-200 group"
              aria-label="Desbloquear"
            >
              <UnblockIcon />
            </button>
          ) : (
            <>
              <button
                onClick={() => onFavorite(user.login.uuid)}
                className={`p-2 rounded-full bg-slate-800/70 hover:bg-amber-500/40 group ${isFavorite ? 'ring-2 ring-amber-300/60' : ''}`}
                aria-label="Favorito"
              >
                <HeartIcon isFavorite={isFavorite} />
              </button>
              <button
                onClick={() => onDetails(user)}
                className="p-2 rounded-full bg-slate-800/70 hover:bg-cyan-500/40 group"
                aria-label="Detalles"
              >
                <DetailsIcon />
              </button>
              <button
                onClick={() => onBlock(user.login.uuid)}
                className="p-2 rounded-full bg-slate-800/70 hover:bg-rose-500/40 group"
                aria-label="Bloquear"
              >
                <BlockIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const UserGrid = ({ users, ...props }) => {
  if (users.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {users.map((user) => (
        <UserCard key={user.login.uuid} user={user} {...props} />
      ))}
    </div>
  );
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=15')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
      });
  }, []);

  const handleFavorite = (userId) => setFavorites((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  const handleBlock = (userId) => {
    setBlocked((prev) => [...prev, userId]);
    setFavorites((prev) => prev.filter((id) => id !== userId));
  };
  const handleUnblock = (userId) => setBlocked((prev) => prev.filter((id) => id !== userId));
  const handleDetails = (user) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  const favoriteUsers = useMemo(
    () => users.filter((user) => favorites.includes(user.login.uuid) && !blocked.includes(user.login.uuid)),
    [users, favorites, blocked]
  );
  const blockedUsers = useMemo(() => users.filter((user) => blocked.includes(user.login.uuid)), [users, blocked]);
  const regularUsers = useMemo(
    () =>
      users.filter((user) => {
        const fullname = `${user.name.first} ${user.name.last}`.toLowerCase();
        const matchesSearch = fullname.includes(searchQuery.toLowerCase());
        return !favorites.includes(user.login.uuid) && !blocked.includes(user.login.uuid) && matchesSearch;
      }),
    [users, favorites, blocked, searchQuery]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
        <p className="text-2xl font-semibold">Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-10 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Dashboard de Personas</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Remasterización FrontEnd Prueba 4</h1>
            <p className="text-slate-300 max-w-2xl">
              Explora perfiles generados aleatoriamente, marca tus favoritos, bloquea contactos y consulta detalles enriquecidos con un nuevo diseño moderno.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <StatBadge label="Usuarios" value={users.length} accent="from-cyan-400 to-blue-500" />
            <StatBadge label="Favoritos" value={favoriteUsers.length} accent="from-amber-400 to-amber-600" />
            <StatBadge label="Bloqueados" value={blockedUsers.length} accent="from-rose-400 to-rose-600" />
          </div>
        </header>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <label className="flex items-center gap-3 text-slate-200 text-sm font-semibold mb-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">🔍</span>
            <span>Busca por nombre</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ejemplo: Sofia, John, etc."
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Limpiar búsqueda"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {favoriteUsers.length > 0 && (
          <section className="space-y-4">
            <SectionHeader title="Favoritos" subtitle="Personas destacadas que marcaste con un ❤️" accent="text-amber-300" />
            <UserGrid users={favoriteUsers} isFavorite={true} onFavorite={handleFavorite} onBlock={handleBlock} onDetails={handleDetails} />
          </section>
        )}

        <section className="space-y-4">
          <SectionHeader title="Usuarios" subtitle="Explora usuarios recomendados para tu lista" accent="text-white" />
          <UserGrid users={regularUsers} isFavorite={false} onFavorite={handleFavorite} onBlock={handleBlock} onDetails={handleDetails} />
          {regularUsers.length === 0 && (
            <p className="text-slate-400 text-center">No encontramos usuarios con ese nombre. Prueba otra búsqueda.</p>
          )}
        </section>

        {blockedUsers.length > 0 && (
          <section className="space-y-4">
            <SectionHeader title="Bloqueados" subtitle="Personas que ocultaste temporalmente" accent="text-rose-300" />
            <UserGrid users={blockedUsers} isBlocked={true} onUnblock={handleUnblock} onDetails={handleDetails} />
          </section>
        )}
      </div>
      <UserModal user={selectedUser} onClose={handleCloseModal} />
    </div>
  );
}

function StatBadge({ label, value, accent }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-800 shadow-lg min-w-[120px]">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`text-2xl font-bold bg-gradient-to-r ${accent} text-transparent bg-clip-text`}>{value}</p>
    </div>
  );
}

function SectionHeader({ title, subtitle, accent }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-lg">✨</div>
        <h2 className={`text-3xl font-bold ${accent}`}>{title}</h2>
      </div>
      <p className="text-slate-400">{subtitle}</p>
    </div>
  );
}
