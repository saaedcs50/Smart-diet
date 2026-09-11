import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { applyBrandTheme, applyBrandHeadAssets } from './config/brand';
import { migrateLegacyStorageOnce } from './utils/storageKeys';

applyBrandTheme();
applyBrandHeadAssets();
migrateLegacyStorageOnce();

createRoot(document.getElementById('root')!).render(
 <StrictMode>
 <App />
 </StrictMode>,
);
