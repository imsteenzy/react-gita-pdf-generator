import react from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const roolElement = document.getElementById('root');
if (roolElement) {
  ReactDOM.createRoot(roolElement).render(
    <react.StrictMode>
      <App />
    </react.StrictMode>
  );
}