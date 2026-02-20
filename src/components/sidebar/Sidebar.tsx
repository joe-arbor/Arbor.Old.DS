import React from 'react';
import classnames from 'classnames';
import {
  Home,
  Star,
  Bell,
  Calendar,
  HelpCircle,
  LogOut,
  LucideIcon,
} from 'lucide-react';
import './sidebar.scss';

export interface SidebarItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
}

const DEFAULT_ITEMS: SidebarItemConfig[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'favourites', label: 'Favourites', icon: Star },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'my-calendar', label: 'My Calendar', icon: Calendar },
  { id: 'help', label: 'Help & Learn with Arbor', icon: HelpCircle },
  { id: 'sign-out', label: 'Sign Out', icon: LogOut },
];

export interface SidebarProps {
  /** Override default items. Default: Home, Favourites, Notifications, My Calendar, Help & Learn with Arbor, Sign Out. */
  items?: SidebarItemConfig[];
  /** Optional class for the root. */
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ items = DEFAULT_ITEMS, className }) => {
  return (
    <aside className={classnames('ds-sidebar', className)} aria-label="Primary navigation">
      <nav className="ds-sidebar__nav">
        <ul className="ds-sidebar__list" role="list">
          {items.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon size={24} className="ds-sidebar__icon" aria-hidden />
                <span className="ds-sidebar__label">{item.label}</span>
              </>
            );
            return (
              <li key={item.id} className="ds-sidebar__item">
                {item.href ? (
                  <a
                    href={item.href}
                    className="ds-sidebar__link"
                    onClick={item.onClick}
                    aria-label={item.label}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="ds-sidebar__link"
                    onClick={item.onClick}
                    aria-label={item.label}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
