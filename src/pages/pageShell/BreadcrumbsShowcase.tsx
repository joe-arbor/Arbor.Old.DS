import React, { useState } from 'react';
import { PanelLeftClose } from 'lucide-react';
import { Breadcrumbs, BreadcrumbItem } from '../../components/breadcrumbs';
import { Toast } from '../../components/toast/Toast';
import './breadcrumbsShowcase.scss';

const SAMPLE_ITEMS: BreadcrumbItem[] = [
  {
    label: 'Students',
    dropdownItems: [
      { label: 'Students', href: '#' },
      { label: 'Staff', href: '#' },
    ],
  },
  {
    label: 'Attendance',
    dropdownItems: [
      { label: 'Attendance', href: '#' },
      { label: 'Behaviour', href: '#' },
    ],
  },
  {
    label: 'Registers',
    dropdownItems: [
      { label: 'Registers', href: '#' },
      { label: 'Absentees', href: '#' },
    ],
  },
  {
    label: 'Daily Attendance',
    isCurrent: true,
  },
];

export function BreadcrumbsShowcase() {
  const [toast, setToast] = useState<string | null>(null);

  const handleCopy = () => {
    const text = SAMPLE_ITEMS.map((i) => i.label).join(' > ');
    void navigator.clipboard.writeText(text).then(() => {
      setToast('Breadcrumb trail copied');
      window.setTimeout(() => setToast(null), 2000);
    });
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
    <div className="breadcrumbs-showcase">
      <p className="breadcrumbs-showcase__intro">
        Breadcrumbs show where the user is in the IA and give access to higher levels. Trail is below the app bar,
        above the page title. Link crumbs navigate; folder crumbs (with chevron) open a dropdown of siblings;
        the last crumb is current and not clickable. Copy icon copies the trail as plain text (e.g. for support).
        Focus uses a green pill outline.
      </p>

      <div className="breadcrumbs-showcase__demo">
        <Breadcrumbs
          items={SAMPLE_ITEMS}
          onCopyTrail={handleCopy}
          leading={leading}
        />
      </div>

      {toast && (
        <Toast variant="info" onClose={() => setToast(null)}>
          {toast}
        </Toast>
      )}
    </div>
  );
}
