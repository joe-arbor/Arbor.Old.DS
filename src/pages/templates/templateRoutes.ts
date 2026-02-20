/**
 * Registry of MIS template pages.
 * Add a new entry here and create the corresponding page component to add a template.
 */
export interface TemplateRoute {
  id: string;
  name: string;
  description?: string;
}

export const TEMPLATE_ROUTES: TemplateRoute[] = [
  {
    id: 'behaviour',
    name: 'Behaviour',
    description: 'Behaviour / conduct template (MIS-style page).',
  },
  // Add more MIS pages here, e.g.:
  // { id: 'attendance', name: 'Attendance', description: '...' },
  // { id: 'students', name: 'Students', description: '...' },
];
