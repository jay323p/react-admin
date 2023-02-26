import eclipseLoader from '../../assets/eclipse.gif';
import ReactDOM from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9,
      }}
    >
      <div
        style={{
          zIndex: 999,
        }}
      >
        <img src={eclipseLoader} alt="Loading..." />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

export const EclipseLoader = () => {
  return (
    <div>
      <img
        src={eclipseLoader}
        alt="Loading..."
        style={{ height: '2rem', width: '2rem' }}
      />
    </div>
  );
};

export default Loader;
