import { startTransition, useMemo } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useFavorites } from '../hooks/useFavorites';
import { useNotice } from '../hooks/useNotice';
import { usePokedex } from '../hooks/usePokedex';
import { useSession } from '../hooks/useSession';
import {
  SESSION_EXPIRED_MESSAGE,
  SIGNIN_SUCCESS_MESSAGE,
  SIGNOUT_SUCCESS_MESSAGE,
  SIGNUP_SUCCESS_MESSAGE,
} from '../utils/constants';
import { formatPokemonName } from '../utils/format';
import { ApiError } from '../utils/request';
import type { Credentials, Favorite, Pokemon, Registration } from '../utils/types';
import About from './About';
import Favorites from './Favorites';
import Footer from './Footer';
import Header from './Header';
import Login from './Login';
import Main from './Main';
import Notice from './Notice';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';

function App() {
  const navigate = useNavigate();
  const { query, pokemon, total, status, search, showMore } = usePokedex();
  const { currentUser, isCheckingSession, signUp, signIn, signOut } = useSession();
  const favorites = useFavorites(currentUser?._id);
  const { notice, showNotice } = useNotice();
  const isBusy = status === 'loading' || status === 'loading-more';

  const savedIds = useMemo(
    () => new Set(favorites.favorites.map((item) => item.pokemonId)),
    [favorites.favorites],
  );

  const endSession = (message: string) => {
    // En la misma transición: si no, la ruta protegida redirige a /signin antes de llegar a /
    startTransition(() => {
      signOut();
      favorites.clearFavorites();
      showNotice(message);
      navigate('/');
    });
  };

  const handleFavoriteError = (err: unknown) => {
    if (err instanceof ApiError && err.status === 401) {
      endSession(SESSION_EXPIRED_MESSAGE);
    } else if (err instanceof Error) {
      showNotice(err.message, true);
    }
  };

  const handleSignUp = async (data: Registration) => {
    await signUp(data);
    showNotice(SIGNUP_SUCCESS_MESSAGE);
    navigate('/signin');
  };

  const handleSignIn = async (data: Credentials) => {
    await signIn(data);
    showNotice(SIGNIN_SUCCESS_MESSAGE);
  };

  const handleSave = async (item: Pokemon) => {
    try {
      await favorites.addFavorite(item);
      showNotice(`${formatPokemonName(item.name)} se guardó en tus favoritos.`);
    } catch (err) {
      handleFavoriteError(err);
    }
  };

  const handleRemove = async (item: Favorite) => {
    try {
      await favorites.removeFavorite(item._id);
      showNotice(`${formatPokemonName(item.name)} se eliminó de tus favoritos.`);
    } catch (err) {
      handleFavoriteError(err);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isBusy={isBusy}
          isCheckingSession={isCheckingSession}
          onSignOut={() => endSession(SIGNOUT_SUCCESS_MESSAGE)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                query={query}
                pokemon={pokemon}
                total={total}
                status={status}
                savedIds={savedIds}
                isCheckingSession={isCheckingSession}
                onSearch={search}
                onShowMore={showMore}
                onSave={handleSave}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute isCheckingSession={isCheckingSession}>
                <Favorites
                  favorites={favorites.favorites}
                  status={favorites.status}
                  onRemove={handleRemove}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute isCheckingSession={isCheckingSession} isGuestOnly>
                <Login onSubmit={handleSignIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute isCheckingSession={isCheckingSession} isGuestOnly>
                <Register onSubmit={handleSignUp} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        {notice && <Notice notice={notice} />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
