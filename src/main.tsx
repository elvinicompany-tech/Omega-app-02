import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign Vite WebSocket errors in AI Studio environment
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason === 'WebSocket closed without opened.' || 
      (event.reason && typeof event.reason === 'string' && event.reason.includes('WebSocket closed'))) {
    event.preventDefault();
  }
});

// Added Global Error Boundary for better diagnostics
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Critical Runtime Error:", message, "at", source, lineno, colno, error);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="background: #0E0E0E; color: white; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; padding: 20px; text-align: center;">
        <h1 style="color: #FFB4AB; font-size: 1.5rem;">Erro de Inicialização</h1>
        <p style="opacity: 0.6; font-size: 0.8rem; margin-top: 10px;">O sistema encontrou um erro crítico ao iniciar.</p>
        <pre style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; font-size: 0.7rem; max-width: 100%; overflow: auto; margin-top: 20px;">${message}</pre>
        <button onclick="window.location.reload()" style="margin-top: 20px; background: white; color: black; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Recarregar</button>
      </div>
    `;
  }
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Only load script if key is present and doesn't look like a placeholder
if (GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY.length > 20 && !GOOGLE_MAPS_API_KEY.includes('MY_') && !GOOGLE_MAPS_API_KEY.includes('YOUR_')) {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
} else {
  console.warn('Google Maps API Key is missing or invalid. Please set VITE_GOOGLE_MAPS_API_KEY in Secrets.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
