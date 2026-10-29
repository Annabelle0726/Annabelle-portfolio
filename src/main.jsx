import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/css/style.css';
import './theme.css';
import './styles.css';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
