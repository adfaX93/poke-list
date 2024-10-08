import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importa el Provider
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

// Crear el root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Si deseas comenzar a medir el rendimiento en tu aplicación, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíalos a un endpoint de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();