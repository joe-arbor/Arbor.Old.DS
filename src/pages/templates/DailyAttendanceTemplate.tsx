import React, { useState } from 'react';
import { PanelLeftClose } from 'lucide-react';
import { TopNav } from '../../components/topNav';
import { Sidebar } from '../../components/sidebar';
import { SideMenu, SideMenuItem } from '../../components/sideMenu';
import { Breadcrumbs, BreadcrumbItem } from '../../components/breadcrumbs';
import { Button } from '../../components/button/Button';
import { FilterPanel } from '../../components/filterPanel';
import { DatePicker } from '../../components/datePicker/DatePicker';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { ArborDataTable } from '../../components/arborDataTable';
import { Slideover } from '../../components/slideover';
import type { ColDef } from 'ag-grid-community';
import './templatePage.scss';
import './dailyAttendanceTemplate.scss';

const SESSION_OPTIONS = [
  { value: 'am', label: 'AM' },
  { value: 'pm', label: 'PM' },
];

function formatDatePreview(d: Date | null, session: string): string {
  if (!d) return 'No date selected.';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[d.getDay()];
  const date = d.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const sessionLabel = session === 'pm' ? 'PM' : 'AM';
  return `${dayName}, ${date} ${month} ${year} ${sessionLabel}. Showing Attendance Registers. Showing Interventions.`;
}

const ATTENDANCE_MENU_ITEMS: SideMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', isFavorite: false },
  {
    id: 'registers',
    label: 'Registers',
    children: [
      { id: 'daily-attendance', label: 'Daily Attendance', isFavorite: true },
      { id: 'quick-follow-up', label: 'Quick Follow-Up', isFavorite: false },
      { id: 'incomplete-registers', label: 'Incomplete Registers', isFavorite: true },
      { id: 'registers-by-date', label: 'Registers By Date', isFavorite: false },
      { id: 'bulk-edit-standard', label: 'Bulk Edit Marks Standard', isFavorite: true },
      { id: 'bulk-edit-advanced', label: 'Bulk Edit Marks Advanced', isFavorite: false },
      { id: 'roll-call-marks', label: 'Roll Call Marks', isFavorite: false },
    ],
  },
  {
    id: 'absentees',
    label: 'Absentees',
    children: [
      { id: 'absentees-by-date', label: 'Absentees By Date', isFavorite: false },
    ],
  },
  { id: 'latecomers', label: 'Latecomers', isFavorite: true },
  { id: 'statistics', label: 'Statistics', isFavorite: true },
  { id: 'attendance-over-time', label: 'Attendance Over Time', isFavorite: true },
  { id: 'reports', label: 'Reports', isFavorite: true },
  {
    id: 'admin',
    label: 'Admin',
    children: [
      { id: 'admin-settings', label: 'Settings', isFavorite: false },
    ],
  },
];

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: 'Students', href: '#' },
  { label: 'Attendance', href: '#' },
  { label: 'Registers', href: '#' },
  { label: 'Daily Attendance', isCurrent: true },
];

interface AttendanceRegisterRow {
  id: string;
  time: string;
  lessonEvent: string;
  yearGroup: string;
  eventType: string;
  teacher: string;
  present: number;
  late: number;
  absent: number;
}

const SAMPLE_ROWS: AttendanceRegisterRow[] = [
  { id: '1', time: '13:40-14:30', lessonEvent: 'AppliedA+D: Year 11: 11...', yearGroup: 'Year 11', eventType: 'Lesson', teacher: 'Andy Holmes', present: 32, late: 0, absent: 3 },
  { id: '2', time: '14:30-15:20', lessonEvent: 'Maths: Year 10', yearGroup: 'Year 10', eventType: 'Lesson', teacher: 'Jane Smith', present: 28, late: 2, absent: 1 },
  { id: '3', time: '09:00-09:45', lessonEvent: 'English: Year 9', yearGroup: 'Year 9', eventType: 'Lesson', teacher: 'Chris Lee', present: 30, late: 1, absent: 0 },
  { id: '4', time: '10:00-10:45', lessonEvent: 'Science: Year 11', yearGroup: 'Year 11', eventType: 'Lesson', teacher: 'Andy Holmes', present: 29, late: 0, absent: 2 },
  { id: '5', time: '11:05-11:50', lessonEvent: 'PE: Year 10', yearGroup: 'Year 10', eventType: 'Lesson', teacher: 'Sam Jones', present: 25, late: 3, absent: 2 },
];

const COLUMN_DEFS: ColDef<AttendanceRegisterRow>[] = [
  { field: 'time', headerName: 'Time', sortable: true, flex: 1, minWidth: 120, cellClass: 'ds-arbor-table-cell-link' },
  { field: 'lessonEvent', headerName: 'Lesson/Event', flex: 2, minWidth: 200 },
  { field: 'yearGroup', headerName: 'Year Group', flex: 1, minWidth: 100 },
  { field: 'eventType', headerName: 'Event Type', flex: 1, minWidth: 100 },
  { field: 'teacher', headerName: 'Teacher', flex: 1, minWidth: 120 },
  {
    colId: 'marks',
    headerName: 'Marks',
    flex: 1,
    minWidth: 140,
    valueGetter: (params) => {
      const r = params.data;
      if (!r) return '';
      return `✓ ${r.present}  🟡 ${r.late}  ❌ ${r.absent}`;
    },
  },
];

export function DailyAttendanceTemplate() {
  const [askArborOpen, setAskArborOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(ATTENDANCE_MENU_ITEMS);
  const [filterDate, setFilterDate] = useState<Date | null>(() => new Date(2026, 1, 20));
  const [filterSession, setFilterSession] = useState('pm');
  const filterPreview = formatDatePreview(filterDate, filterSession);

  const handleToggleFavorite = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => toggleFavoriteInTree(item, id))
    );
  };

  const leading = (
    <button
      type="button"
      className="ds-breadcrumbs__leading-btn"
      aria-label="Collapse sidebar"
      title="Collapse sidebar"
    >
      <PanelLeftClose size={18} aria-hidden />
    </button>
  );

  return (
    <div className="template-page template-page--with-nav">
      <TopNav
        searchPlaceholder="Search or ask..."
        onAskArborClick={() => setAskArborOpen(true)}
      />

      <div className="template-page__body">
        <Sidebar className="template-page__sidebar" />
        <SideMenu
          className="template-page__side-menu"
          pageTitle="Attendance"
          items={menuItems}
          selectedId="daily-attendance"
          onSelect={() => {}}
          onToggleFavorite={handleToggleFavorite}
        />

        <main className="template-page__content">
          <Breadcrumbs items={BREADCRUMB_ITEMS} leading={leading} />

          <div className="template-page__content-inner">
          <header className="template-page__content-header">
            <div className="template-page__content-header-top">
              <h1 className="template-page__content-title">Daily Attendance</h1>
            </div>
            <div className="template-page__content-header-actions">
              <Button variant="primary" color="green">
                Emergency evacuation register
              </Button>
            </div>
          </header>

          <FilterPanel
            filterPreview={filterPreview}
            onApply={() => {}}
            onCancel={() => {}}
          >
            <DatePicker
              label="Select date"
              value={filterDate}
              onChange={setFilterDate}
              placeholder="Select date"
            />
            <Dropdown
              label="Session"
              options={SESSION_OPTIONS}
              value={filterSession}
              onChange={setFilterSession}
            />
          </FilterPanel>

          <ArborDataTable<AttendanceRegisterRow>
            tableId="daily-attendance-registers"
            rowData={SAMPLE_ROWS}
            getRowId={(row) => row.id}
            columnDefs={COLUMN_DEFS}
            rowSelection={true}
            showToolbar={true}
            showHideColumns={true}
            showSearch={true}
            showExpandButton={true}
            bulkActions={[
              {
                id: 'export',
                label: 'Export selected',
                handler: (rows) => console.log('Export', rows),
              },
            ]}
            onExpandTable={() => {}}
          />
          </div>
        </main>
      </div>

      <Slideover
        open={askArborOpen}
        onClose={() => setAskArborOpen(false)}
        title="Ask Arbor"
      >
        <p>Start a conversation with the AI-powered tool here.</p>
      </Slideover>
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
