import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { ChevronDown, Link2 } from 'lucide-react';
import './breadcrumbs.scss';

export interface BreadcrumbDropdownItem {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Link crumb: navigates to this href */
  href?: string;
  /** Folder crumb: options shown in dropdown; selecting one navigates and rebuilds trail */
  dropdownItems?: BreadcrumbDropdownItem[];
  /** Current (last) crumb: not clickable, context only */
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  /** Ordered list of crumbs. Last item should have isCurrent: true. */
  items: BreadcrumbItem[];
  /** Called when copy trail icon is clicked. Default copies "A > B > C" to clipboard. */
  onCopyTrail?: () => void;
  /** Optional leading element (e.g. sidebar toggle button). Rendered left of the trail. */
  leading?: React.ReactNode;
  /** Optional class for the root. */
  className?: string;
}

/** Build plain-text trail for copy (e.g. "Students > Attendance > Daily Attendance"). */
function getTrailText(items: BreadcrumbItem[]): string {
  return items.map((i) => i.label).join(' > ');
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onCopyTrail,
  leading,
  className,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (openDropdownId === null) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdownId]);

  const handleCopy = () => {
    if (onCopyTrail) {
      onCopyTrail();
    } else {
      const text = getTrailText(items);
      void navigator.clipboard.writeText(text);
    }
  };

  const lastIndex = items.length - 1;

  return (
    <nav
      ref={containerRef}
      className={classnames('ds-breadcrumbs', className)}
      aria-label="Breadcrumb"
    >
      <div className="ds-breadcrumbs__inner">
        {leading && <div className="ds-breadcrumbs__leading">{leading}</div>}

        <ol className="ds-breadcrumbs__list">
          {items.map((item, index) => {
            const isLast = index === lastIndex;
            const isCurrent = item.isCurrent ?? isLast;
            const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;
            const dropdownId = `breadcrumb-dd-${index}`;
            const isDropdownOpen = openDropdownId === dropdownId;

            return (
              <li
                key={`${item.label}-${index}`}
                className="ds-breadcrumbs__crumb"
                aria-current={isCurrent ? 'page' : undefined}
              >
                {index > 0 && (
                  <span className="ds-breadcrumbs__separator" aria-hidden>
                    /
                  </span>
                )}

                {isCurrent ? (
                  <span className="ds-breadcrumbs__current">{item.label}</span>
                ) : hasDropdown ? (
                  <div className="ds-breadcrumbs__folder-wrap">
                    <button
                      type="button"
                      className="ds-breadcrumbs__folder-btn"
                      onClick={() => setOpenDropdownId(isDropdownOpen ? null : dropdownId)}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                      aria-controls={isDropdownOpen ? dropdownId : undefined}
                      id={`${dropdownId}-trigger`}
                    >
                      <ChevronDown size={14} className="ds-breadcrumbs__chevron" aria-hidden />
                      <span>{item.label}</span>
                    </button>
                    {isDropdownOpen && item.dropdownItems && (
                      <ul
                        id={dropdownId}
                        className="ds-breadcrumbs__dropdown"
                        role="menu"
                        aria-labelledby={`${dropdownId}-trigger`}
                      >
                        {item.dropdownItems.map((opt, i) => (
                          <li key={i} role="none">
                            {opt.href ? (
                              <a
                                href={opt.href}
                                className="ds-breadcrumbs__dropdown-link"
                                role="menuitem"
                                onClick={(e) => {
                                  opt.onClick?.();
                                  setOpenDropdownId(null);
                                }}
                              >
                                {opt.label}
                              </a>
                            ) : (
                              <button
                                type="button"
                                className="ds-breadcrumbs__dropdown-link"
                                role="menuitem"
                                onClick={() => {
                                  opt.onClick?.();
                                  setOpenDropdownId(null);
                                }}
                              >
                                {opt.label}
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a href={item.href ?? '#'} className="ds-breadcrumbs__link">
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>

        {items.length > 0 && (
          <button
            type="button"
            className="ds-breadcrumbs__copy"
            onClick={handleCopy}
            aria-label="Copy breadcrumb trail"
            title="Copy breadcrumb trail"
          >
            <Link2 size={16} aria-hidden />
          </button>
        )}
      </div>
    </nav>
  );
};
