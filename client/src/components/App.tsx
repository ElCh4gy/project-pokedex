import { Navigate, Route, Routes } from 'react-router-dom';
import { usePokedex } from '../hooks/usePokedex';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function App() {
  const { query, pokemon, total, status, search, showMore } = usePokedex();
  const isBusy = status === 'loading' || status === 'loading-more';

  return (
    <div className="page">
      <Header isBusy={isBusy} />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              query={query}
              pokemon={pokemon}
              total={total}
              status={status}
              onSearch={search}
              onShowMore={showMore}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
