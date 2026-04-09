import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BiasAnalysisProvider } from './context/BiasAnalysisContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <BiasAnalysisProvider>
        <App />
      </BiasAnalysisProvider>
    </HashRouter>
  </StrictMode>
);
