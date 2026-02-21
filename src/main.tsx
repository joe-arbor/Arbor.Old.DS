import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './tokens.scss';
import './global.css';
import { App } from './App';
import { PageShell } from './pages/pageShell/PageShell';
import { TemplatePage } from './pages/templates';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/components" replace />} />
            <Route path="components" element={<PageShell />} />
            <Route path="templates" element={<Navigate to="/templates/daily-attendance" replace />} />
            <Route path="templates/:pageId" element={<TemplatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
