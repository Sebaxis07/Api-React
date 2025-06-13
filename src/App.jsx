import React, { useEffect, useState } from 'react';

const HeartIcon = ({ isFavorite }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-300 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

const BlockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
);

const UnblockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const DetailsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative text-white" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
                <div className="text-center">
                    <img className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-cyan-500 object-cover" src={user.picture.large} alt="Profile" />
                    <h2 className="text-3xl font-bold">{user.name.first} {user.name.last}</h2>
                    <p className="text-cyan-400 break-words">{user.email}</p>
                </div>
                <div className="mt-6 border-t border-gray-700 pt-6 space-y-4 text-lg">
                    <p><strong className="font-semibold text-gray-300">Género:</strong> <span className="text-gray-400 capitalize">{user.gender}</span></p>
                    <p><strong className="font-semibold text-gray-300">Dirección:</strong> <span className="text-gray-400">{fullAddress}</span></p>
                    <p><strong className="font-semibold text-gray-300">Teléfono:</strong> <span className="text-gray-400">{user.phone}</span></p>
                    <p><strong className="font-semibold text-gray-300">Celular:</strong> <span className="text-gray-400">{user.cell}</span></p>
                    <p><strong className="font-semibold text-gray-300">Edad:</strong> <span className="text-gray-400">{user.dob.age} años</span></p>
                </div>
            </div>
        </div>
    );
}

function UserCard({ user, isFavorite, isBlocked, onFavorite, onBlock, onUnblock, onDetails }) {
  const cardStyle = isBlocked ? 'border-red-500/50 bg-gray-800/50' : isFavorite ? 'border-yellow-400 shadow-yellow-400/30' : 'border-gray-700';
  const imageStyle = isBlocked ? 'grayscale' : '';

  return (
    <div className={`border rounded-lg p-4 text-center shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center bg-gray-800 ${cardStyle} hover:shadow-cyan-400/30`}>
      <img className={`w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-500 object-cover ${imageStyle}`} src={user.picture.large} alt={`Foto de perfil de ${user.name.first} ${user.name.last}`} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/1f2937/ffffff?text=Error'; }}/>
      <div className="flex-grow flex flex-col items-center mb-3">
        <h2 className="text-xl font-bold text-white">{user.name.first} {user.name.last}</h2>
        <p className="text-gray-400 mt-1 text-sm break-all">{user.email}</p>
      </div>
      <div className="flex justify-around w-full mt-auto pt-3 border-t border-gray-700/50">
        {isBlocked ? (
          <button onClick={() => onUnblock(user.login.uuid)} className="p-2 rounded-full hover:bg-gray-700 group transition-colors duration-300" aria-label="Desbloquear"><UnblockIcon /></button>
        ) : (
          <>
            <button onClick={() => onFavorite(user.login.uuid)} className="p-2 rounded-full hover:bg-gray-700 group" aria-label="Favorito"><HeartIcon isFavorite={isFavorite} /></button>
            <button onClick={() => onDetails(user)} className="p-2 rounded-full hover:bg-gray-700 group" aria-label="Detalles"><DetailsIcon /></button>
            <button onClick={() => onBlock(user.login.uuid)} className="p-2 rounded-full hover:bg-gray-700 group" aria-label="Bloquear"><BlockIcon /></button>
          </>
        )}
      </div>
    </div>
  );
}

const UserGrid = ({ users, ...props }) => {
    if (users.length === 0) return null;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {users.map((user) => ( <UserCard key={user.login.uuid} user={user} {...props} /> ))}
        </div>
    );
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery,setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=15').then(res => res.json()).then(data => {
        setUsers(data.results);
        setLoading(false);
    }).catch(err => {
        console.log('Error: ', err);
        setLoading(false);
    });
  }, []);

  const handleFavorite = (userId) => setFavorites((prev) => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  const handleBlock = (userId) => {
    setBlocked((prev) => [...prev, userId]);
    setFavorites((prev) => prev.filter(id => id !== userId));
  };
  const handleUnblock = (userId) => setBlocked((prev) => prev.filter(id => id !== userId));
  const handleDetails = (user) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  const favoriteUsers = users.filter(user => favorites.includes(user.login.uuid) && !blocked.includes(user.login.uuid));
  const blockedUsers = users.filter(user => blocked.includes(user.login.uuid));
  const regularUsers= users.filter(user  =>{
    const fullname= `${user.name.first} ${user.name.last}`.toLowerCase()
    const matchesSearch= fullname.includes(searchQuery.toLowerCase());
    return !favorites.includes(user.login.uuid) &&
           !blocked.includes(user.login.uuid) &&
           matchesSearch;
  })
  if (loading) {
    return (<div className="flex justify-center items-center min-h-screen bg-gray-900 text-white"><p className="text-2xl font-semibold">Cargando usuarios...</p></div>);
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white">Remasterizacion FrontEnd Prueba 4 (Api)</h1>
        <div className='text-center'>
            <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Busca por nombre..' className='w-full max-w-lg p-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors' />
        </div>
        
        {favoriteUsers.length > 0 && (
            <section>
                <h2 className="text-3xl font-bold text-yellow-400 mb-6">Favoritos</h2>
                <UserGrid users={favoriteUsers} isFavorite={true} onFavorite={handleFavorite} onBlock={handleBlock} onDetails={handleDetails} />
            </section>
        )}

        <section>
            <h2 className="text-3xl font-bold text-white mb-6">Usuarios</h2>
            <UserGrid users={regularUsers} isFavorite={false} onFavorite={handleFavorite} onBlock={handleBlock} onDetails={handleDetails} />
        </section>

        {blockedUsers.length > 0 && (
            <section>
                <h2 className="text-3xl font-bold text-red-500 mb-6">Bloqueados</h2>
                <UserGrid users={blockedUsers} isBlocked={true} onUnblock={handleUnblock} onDetails={handleDetails} />
            </section>
        )}
      </div>
      <UserModal user={selectedUser} onClose={handleCloseModal} />
    </div>
  );
}
