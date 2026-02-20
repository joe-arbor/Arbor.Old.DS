import React, { useState, useCallback } from 'react';
import { Sidebar } from '../../components/sidebar';
import { SideMenu, SideMenuItem } from '../../components/sideMenu';
import './sideNavShowcase.scss';

const ATTENDANCE_MENU: SideMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', isFavorite: false },
  {
    id: 'registers',
    label: 'Registers',
    children: [
      { id: 'daily-attendance', label: 'Daily Attendance', isFavorite: true },
      { id: 'quick-follow-up', label: 'Quick Follow-Up', isFavorite: false },
      { id: 'incomplete-registers', label: 'Incomplete Registers', isFavorite: false },
      { id: 'roll-call-marks', label: 'Roll Call Marks', isFavorite: false },
    ],
  },
  {
    id: 'absentees',
    label: 'Absentees',
    children: [
      { id: 'absentees-by-date', label: 'Absentees By Date', isFavorite: false },
      { id: 'absentee-summary', label: 'Absentee Summary', isFavorite: false },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    children: [
      { id: 'admin-settings', label: 'Settings', isFavorite: false },
    ],
  },
];

export function SideNavShowcase() {
  const [selectedId, setSelectedId] = useState<string | null>('daily-attendance');
  const [items, setItems] = useState<SideMenuItem[]>(ATTENDANCE_MENU);

  const handleToggleFavorite = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => toggleFavoriteInTree(item, id))
    );
  }, []);

  return (
    <div className="side-nav-showcase">
      <p className="side-nav-showcase__intro">
        Side navigation is split into two components. <strong>Sidebar</strong> (left): Home, Favourites,
        Notifications, My Calendar, Help &amp; Learn with Arbor, Sign Out — each with a lightest-green hover.
        <strong> Side menu</strong>: page title at top, then hierarchical nav with default/selected states,
        group highlight (green left bar when a child in that group is selected), and a favourite star per page
        (filled when favourited; hover and click to add/remove). Nesting is unlimited.
      </p>

      <div className="side-nav-showcase__demo">
        <Sidebar />
        <SideMenu
          pageTitle="Attendance"
          items={items}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          onToggleFavorite={(id) => handleToggleFavorite(id)}
        />
        <div className="side-nav-showcase__main">
          <p>Main content area. Selected: <strong>{selectedId ?? '—'}</strong></p>
        </div>
      </div>
    </div>
  );
}

function toggleFavoriteInTree(item: SideMenuItem, targetId: string): SideMenuItem {
  if (item.id === targetId) {
    return { ...item, isFavorite: !item.isFavorite };
  }
  if (item.children) {
    return {
      ...item,
      children: item.children.map((child) => toggleFavoriteInTree(child, targetId)),
    };
  }
  return item;
}
