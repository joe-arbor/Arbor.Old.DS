import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import { ChevronDown, ChevronRight, Star } from 'lucide-react';
import './sideMenu.scss';

export interface SideMenuItem {
  id: string;
  label: string;
  href?: string;
  children?: SideMenuItem[];
  /** Controlled: whether this page is in the user's favourites. */
  isFavorite?: boolean;
}

export interface SideMenuProps {
  /** Page title shown at the top (e.g. "Attendance"). */
  pageTitle: string;
  /** Tree of navigation items. Supports unlimited nesting. */
  items: SideMenuItem[];
  /** Currently selected page id (drives selected state and group highlight). */
  selectedId?: string | null;
  /** Called when a page link is chosen (for client-side routing or navigation). */
  onSelect?: (id: string, item: SideMenuItem) => void;
  /** Called when the favourite star is clicked to add/remove from favourites. */
  onToggleFavorite?: (id: string, item: SideMenuItem) => void;
  /** Optional class for the root. */
  className?: string;
}

/** Recursive helper: does the subtree under `item` contain `selectedId`? */
function subtreeContainsSelected(item: SideMenuItem, selectedId: string | null | undefined): boolean {
  if (!selectedId) return false;
  if (item.id === selectedId) return true;
  if (item.children) {
    return item.children.some((child) => subtreeContainsSelected(child, selectedId));
  }
  return false;
}

/** Recursive helper: is this item the selected one? */
function isSelected(item: SideMenuItem, selectedId: string | null | undefined): boolean {
  return item.id === selectedId;
}

interface SideMenuRowProps {
  item: SideMenuItem;
  depth: number;
  selectedId: string | null | undefined;
  onSelect: (id: string, item: SideMenuItem) => void;
  onToggleFavorite: (id: string, item: SideMenuItem) => void;
  groupHasSelected: boolean;
}

function SideMenuRow({
  item,
  depth,
  selectedId,
  onSelect,
  onToggleFavorite,
  groupHasSelected,
}: SideMenuRowProps) {
  const hasChildren = item.children && item.children.length > 0;
  const [expanded, setExpanded] = useState(true);
  const selected = isSelected(item, selectedId);
  const isFavorite = item.isFavorite === true;

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.ds-side-menu__star-wrap')) return;
    if (hasChildren) {
      setExpanded((prev) => !prev);
    } else {
      onSelect(item.id, item);
    }
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(item.id, item);
  };

  const childGroupHasSelected = hasChildren && subtreeContainsSelected(item, selectedId);
  const showGroupBar = hasChildren && childGroupHasSelected;

  return (
    <div
      className={classnames('ds-side-menu__row-wrap', {
        'ds-side-menu__row-wrap--group-highlight': showGroupBar,
      })}
      data-depth={depth}
    >
      <div
        className={classnames('ds-side-menu__row', {
          'ds-side-menu__row--selected': selected,
        })}
      >
        <div
          className={classnames('ds-side-menu__row-inner', {
            'ds-side-menu__row-inner--selected': selected,
          })}
          style={{ paddingLeft: 12 + depth * 16 }}
        >
          {hasChildren ? (
            <button
              type="button"
              className="ds-side-menu__expand"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((prev) => !prev);
              }}
              aria-expanded={expanded}
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? (
                <ChevronDown size={16} className="ds-side-menu__chevron" aria-hidden />
              ) : (
                <ChevronRight size={16} className="ds-side-menu__chevron" aria-hidden />
              )}
            </button>
          ) : (
            <span className="ds-side-menu__expand-placeholder" aria-hidden />
          )}

          {item.href && !hasChildren ? (
            <a
              href={item.href}
              className="ds-side-menu__link"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('.ds-side-menu__star-wrap')) return;
                onSelect(item.id, item);
              }}
            >
              {item.label}
            </a>
          ) : (
            <button
              type="button"
              className="ds-side-menu__link"
              onClick={handleClick}
            >
              {item.label}
            </button>
          )}

          {!hasChildren && (
            <span className="ds-side-menu__star-wrap">
              <button
                type="button"
                className="ds-side-menu__star"
                onClick={handleStarClick}
                aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
                title={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <Star
                  size={16}
                  className={classnames('ds-side-menu__star-icon', {
                    'ds-side-menu__star-icon--filled': isFavorite,
                  })}
                  aria-hidden
                  fill={isFavorite ? 'currentColor' : 'none'}
                />
              </button>
            </span>
          )}
        </div>
      </div>

      {hasChildren && expanded && (
        <div className="ds-side-menu__children">
          {item.children!.map((child) => (
            <SideMenuRow
              key={child.id}
              item={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onToggleFavorite={onToggleFavorite}
              groupHasSelected={childGroupHasSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const SideMenu: React.FC<SideMenuProps> = ({
  pageTitle,
  items,
  selectedId = null,
  onSelect = () => {},
  onToggleFavorite = () => {},
  className,
}) => {
  return (
    <aside className={classnames('ds-side-menu', className)} aria-label="Page navigation">
      <h2 className="ds-side-menu__title">{pageTitle}</h2>
      <nav className="ds-side-menu__nav">
        {items.map((item) => (
          <SideMenuRow
            key={item.id}
            item={item}
            depth={0}
            selectedId={selectedId}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
            groupHasSelected={subtreeContainsSelected(item, selectedId)}
          />
        ))}
      </nav>
    </aside>
  );
};
