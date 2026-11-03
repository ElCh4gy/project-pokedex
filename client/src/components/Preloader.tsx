import '../styles/preloader.css';

function Preloader() {
  return (
    <div className="preloader" role="status">
      <i className="circle-preloader" aria-hidden="true" />
      <p className="preloader__text">Cargando...</p>
    </div>
  );
}

export default Preloader;
