import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { Search, Sparkles, ChevronDown } from 'lucide-react';
import './topNav.scss';

export interface TopNavMenuItem {
  id: string;
  label: string;
  /** Optional: links or actions for the dropdown. Omit for now to show chevron only. */
  children?: { label: string; href?: string; onClick?: () => void }[];
}

export interface TopNavProps {
  /** School logo: image URL or ReactNode (e.g. placeholder). */
  schoolLogo?: React.ReactNode;
  /** Main nav items (My Items, Students, School, Reporting, System). */
  menuItems?: TopNavMenuItem[];
  /** Search placeholder text. */
  searchPlaceholder?: string;
  /** Called when user submits search or focuses and presses Enter. */
  onSearch?: (value: string) => void;
  /** Called when "Ask Arbor" is clicked — use to open the AI slideover. */
  onAskArborClick?: () => void;
  /** Optional class for the root. */
  className?: string;
}

const defaultMenuItems: TopNavMenuItem[] = [
  { id: 'my-items', label: 'My Items' },
  { id: 'students', label: 'Students' },
  { id: 'school', label: 'School' },
  { id: 'reporting', label: 'Reporting' },
  { id: 'system', label: 'System' },
];

/** Arbor wordmark + four-circles icon. */
function ArborLogo() {
  return (
    <div className="ds-top-nav__arbor-logo" aria-hidden>
      <svg
        className="ds-top-nav__arbor-icon"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx="10" cy="14" r="7" fill="var(--color-brand-400)" opacity="0.9" />
        <circle cx="18" cy="10" r="7" fill="var(--color-chart-colours-yellow-1)" opacity="0.9" />
        <circle cx="18" cy="18" r="7" fill="var(--color-chart-colours-orange-1)" opacity="0.9" />
        <circle cx="10" cy="10" r="7" fill="var(--color-brand-600)" opacity="0.9" />
      </svg>
      <span className="ds-top-nav__arbor-text">Arbor</span>
    </div>
  );
}

/** Filler school logo: circular placeholder with sunburst-style graphic. */
function DefaultSchoolLogo() {
  return (
    <div className="ds-top-nav__school-logo-placeholder" aria-hidden>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="var(--color-chart-colours-orange-1)" />
        <path
          d="M20 4v6M20 30v6M4 20h6M30 20h6M8.5 8.5l4.2 4.2M27.3 27.3l-4.2-4.2M8.5 31.5l4.2-4.2M27.3 12.7l-4.2 4.2"
          stroke="var(--color-chart-colours-teal-1)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse cx="20" cy="24" rx="8" ry="4" fill="var(--color-chart-colours-teal-2)" opacity="0.9" />
      </svg>
    </div>
  );
}

export const TopNav: React.FC<TopNavProps> = ({
  schoolLogo,
  menuItems = defaultMenuItems,
  searchPlaceholder = 'Search or ask...',
  onSearch,
  onAskArborClick,
  className,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openMenuId) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue.trim());
  };

  return (
    <nav
      ref={navRef}
      className={classnames('ds-top-nav', className)}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="ds-top-nav__inner">
        <div className="ds-top-nav__start">
          <div className="ds-top-nav__school-logo">
            {schoolLogo ?? <DefaultSchoolLogo />}
          </div>
          <ul className="ds-top-nav__menu" role="menubar">
            {menuItems.map((item) => {
              const isOpen = openMenuId === item.id;
              const hasDropdown = item.children && item.children.length > 0;
              return (
                <li key={item.id} className="ds-top-nav__menu-item" role="none">
                  <button
                    type="button"
                    className={classnames('ds-top-nav__menu-btn', { 'ds-top-nav__menu-btn--open': isOpen })}
                    onClick={() => setOpenMenuId(hasDropdown ? (isOpen ? null : item.id) : undefined)}
                    aria-haspopup={hasDropdown ? 'menu' : undefined}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                    aria-current={isOpen ? 'true' : undefined}
                    role="menuitem"
                  >
                    {item.label}
                    <ChevronDown size={14} className="ds-top-nav__chevron" aria-hidden />
                  </button>
                  {hasDropdown && isOpen && item.children && (
                    <ul className="ds-top-nav__dropdown" role="menu">
                      {item.children.map((child, i) => (
                        <li key={i} role="none">
                          {child.href ? (
                            <a href={child.href} className="ds-top-nav__dropdown-link" role="menuitem">
                              {child.label}
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="ds-top-nav__dropdown-link"
                              onClick={() => {
                                child.onClick?.();
                                setOpenMenuId(null);
                              }}
                              role="menuitem"
                            >
                              {child.label}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="ds-top-nav__center">
          <form className="ds-top-nav__search-form" onSubmit={handleSearchSubmit} role="search">
            <Search size={18} className="ds-top-nav__search-icon" aria-hidden />
            <input
              type="search"
              className="ds-top-nav__search-input"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Search"
            />
          </form>
          <button
            type="button"
            className="ds-top-nav__ask-btn"
            onClick={onAskArborClick}
            aria-label="Ask Arbor"
          >
            <Sparkles size={18} className="ds-top-nav__ask-icon" aria-hidden />
            <span>Ask Arbor</span>
          </button>
        </div>

        <div className="ds-top-nav__end">
          <ArborLogo />
        </div>
      </div>
    </nav>
  );
};
