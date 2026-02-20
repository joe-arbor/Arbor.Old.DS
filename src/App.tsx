import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './App.scss';

export function App() {
  return (
    <div className="app">
      <header className="app__header" role="banner">
        <nav className="app__nav" aria-label="Main navigation">
          <NavLink
            to="/components"
            className={({ isActive }) =>
              `app__nav-link ${isActive ? 'app__nav-link--active' : ''}`
            }
            end={false}
          >
            Components
          </NavLink>
          <NavLink
            to="/templates"
            className={({ isActive }) =>
              `app__nav-link ${isActive ? 'app__nav-link--active' : ''}`
            }
            end={false}
          >
            Templates
          </NavLink>
        </nav>
      </header>
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
}
