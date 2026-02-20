import React from 'react';
import { Link } from 'react-router-dom';
import { TEMPLATE_ROUTES } from './templateRoutes';
import './templatesList.scss';

export function TemplatesList() {
  return (
    <div className="templates-list">
      <div className="templates-list__inner">
        <header className="templates-list__header">
          <h1 className="templates-list__title">Templates</h1>
          <p className="templates-list__description">
            MIS-style pages built with the design system. Select a template to preview.
          </p>
        </header>
        <ul className="templates-list__grid" role="list">
          {TEMPLATE_ROUTES.map((route) => (
            <li key={route.id} className="templates-list__item">
              <Link to={`/templates/${route.id}`} className="templates-list__card">
                <span className="templates-list__card-title">{route.name}</span>
                {route.description && (
                  <span className="templates-list__card-desc">{route.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
