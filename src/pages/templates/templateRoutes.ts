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
    id: 'daily-attendance',
    name: 'Daily Attendance',
    description: 'Standard Arbor page: global nav, module nav (Attendance), content with breadcrumbs and attendance registers table.',
  },
  {
    id: 'behaviour',
    name: 'Behaviour',
    description: 'Behaviour / conduct template (MIS-style page).',
  },
];
