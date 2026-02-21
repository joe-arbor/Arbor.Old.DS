import React from 'react';
import { ButtonsShowcase } from './ButtonsShowcase';
import { TypographyShowcase } from './TypographyShowcase';
import { ColoursShowcase } from './ColoursShowcase';
import { IconsShowcase } from './IconsShowcase';
import { TagsShowcase } from './TagsShowcase';
import { PlaceholderImageShowcase } from './PlaceholderImageShowcase';
import { DropdownShowcase } from './DropdownShowcase';
import { TabsShowcase } from './TabsShowcase';
import { SectionsShowcase } from './SectionsShowcase';
import { CardShowcase } from './CardShowcase';
import { ComboboxShowcase } from './ComboboxShowcase';
import { DatePickerShowcase } from './DatePickerShowcase';
import { HtmlEditorShowcase } from './HtmlEditorShowcase';
import { AttachmentShowcase } from './AttachmentShowcase';
import { GridListShowcase } from './GridListShowcase';
import { FormFieldsShowcase } from './FormFieldsShowcase';
import { ToastShowcase } from './ToastShowcase';
import { BannerShowcase } from './BannerShowcase';
import { FilterPanelShowcase } from './FilterPanelShowcase';
import { InfoPanelShowcase } from './InfoPanelShowcase';
import { TooltipShowcase } from './TooltipShowcase';
import { ModalShowcase } from './ModalShowcase';
import { SlideoverShowcase } from './SlideoverShowcase';
import { TopNavShowcase } from './TopNavShowcase';
import { SideNavShowcase } from './SideNavShowcase';
import { BreadcrumbsShowcase } from './BreadcrumbsShowcase';
import { KpiShowcase } from './KpiShowcase';
import { TableShowcase } from './TableShowcase';
import { WelcomeShowcase } from './WelcomeShowcase';

/** Category for sidebar grouping. Order matches display order. */
export const COMPONENT_CATEGORIES = [
  'Foundations',
  'Content',
  'Input',
  'Navigation',
  'Surfaces',
  'Progress & Validation',
] as const;

export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];

/**
 * Storybook-like format for the PageShell.
 * Add a new section here; specify which category folder it belongs to.
 */
export interface ShowcaseSection {
  id: string;
  name: string;
  /** Which sidebar category this section lives under (e.g. Foundations, Input) */
  category: ComponentCategory;
  description?: string;
  /** Render the component(s) for this section — same idea as a Storybook story */
  render: () => React.ReactNode;
}

/**
 * Registry of sections shown in the PageShell sidebar, grouped by category.
 * When you add a component, set category to the folder you want (Foundations, Content, Input, Navigation, Surfaces).
 */
export const showcaseSections: ShowcaseSection[] = [
  {
    id: 'welcome',
    name: 'Welcome',
    category: 'Foundations',
    description: 'System at a glance: component count, design tokens, and explore by category.',
    render: () => <WelcomeShowcase />,
  },
  {
    id: 'buttons',
    name: 'Buttons',
    category: 'Foundations',
    description: 'Primary, secondary, icon, menu, grouped, segmented, and legacy Ext.js styles.',
    render: () => <ButtonsShowcase />,
  },
  {
    id: 'typography',
    name: 'Typography',
    category: 'Foundations',
    description: 'Type roles, font families, size scale, weights, and line height from design tokens.',
    render: () => <TypographyShowcase />,
  },
  {
    id: 'colours',
    name: 'Colours',
    category: 'Foundations',
    description: 'Grey, mono, brand, semantic, chart, and extended colour tokens from design tokens.',
    render: () => <ColoursShowcase />,
  },
  {
    id: 'icons',
    name: 'Icons',
    category: 'Foundations',
    description: 'Lucide icon set. Search and browse; four sizes: 12px, 16px, 24px, 36px.',
    render: () => <IconsShowcase />,
  },
  {
    id: 'tags',
    name: 'Tags',
    category: 'Content',
    description: 'Student-style tags in Big, Default, and Small sizes.',
    render: () => <TagsShowcase />,
  },
  {
    id: 'info-panel',
    name: 'Info Panel',
    category: 'Content',
    description: 'Section with header (avatar, name, reference) and list of rows or tags.',
    render: () => <InfoPanelShowcase />,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Surfaces',
    description: 'Simple (content only) and advanced (title + content + action) tooltips on hover.',
    render: () => <TooltipShowcase />,
  },
  {
    id: 'placeholder-image',
    name: 'Placeholder Image',
    category: 'Content',
    description: 'Circular placeholder icons for avatars, content blocks, and empty states.',
    render: () => <PlaceholderImageShowcase />,
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    category: 'Input',
    description: 'Dropdown menu triggered by a button; optional label (e.g. Year group) or standalone menu button.',
    render: () => <DropdownShowcase />,
  },
  {
    id: 'form-fields',
    name: 'Form Fields',
    category: 'Input',
    description: 'Text, number, currency, duration, time, textarea, checkbox, radio, file upload, colour picker.',
    render: () => <FormFieldsShowcase />,
  },
  {
    id: 'filter-panel',
    name: 'Filter Panel',
    category: 'Input',
    description: 'Edit filter and display settings for a target component (e.g. Table). Filter fields (Form Fields + Filter Field Student/Staff) as children; display fields via display prop.',
    render: () => <FilterPanelShowcase />,
  },
  {
    id: 'combobox',
    name: 'Combobox',
    category: 'Input',
    description: 'Form field combobox: single or multi-select, type to filter, chips for multi, placeholder, disabled.',
    render: () => <ComboboxShowcase />,
  },
  {
    id: 'date-picker',
    name: 'Date Picker',
    category: 'Input',
    description: 'Form field date picker: input with calendar dropdown, min/max range, placeholder, disabled.',
    render: () => <DatePickerShowcase />,
  },
  {
    id: 'html-editor',
    name: 'Html Editor',
    category: 'Input',
    description: 'Form field with HTML value. Optional formatting, colors, image, link, word counter, preview.',
    render: () => <HtmlEditorShowcase />,
  },
  {
    id: 'attachments',
    name: 'Attachments',
    category: 'Input',
    description: 'Drag or click to upload. Download and delete per file. Upload can be disabled.',
    render: () => <AttachmentShowcase />,
  },
  {
    id: 'grid-list',
    name: 'Grid List',
    category: 'Input',
    description: 'Display data with edit and delete. Add items, reorder by drag-and-drop or header sort.',
    render: () => <GridListShowcase />,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Tab sizes (Big, Medium, Small) and alignment (Left, Center, Right); active tab with optional icon.',
    render: () => <TabsShowcase />,
  },
  {
    id: 'top-nav',
    name: 'Top Nav',
    category: 'Navigation',
    description: 'MIS top bar: school logo, menu items (My Items, Students, School, Reporting, System), search (pill), Ask Arbor (opens slideover), Arbor logo.',
    render: () => <TopNavShowcase />,
  },
  {
    id: 'side-nav',
    name: 'Side Nav',
    category: 'Navigation',
    description: 'Sidebar (Home, Favourites, Notifications, My Calendar, Help & Learn, Sign Out) with light green hover; Side menu with page title, tree nav, selection, group highlight, and favourite stars.',
    render: () => <SideNavShowcase />,
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    category: 'Navigation',
    description: 'Trail below app bar: link crumbs, folder crumbs (dropdown), current crumb, / separators, copy trail icon. Green pill focus.',
    render: () => <BreadcrumbsShowcase />,
  },
  {
    id: 'sections',
    name: 'Sections',
    category: 'Surfaces',
    description: 'Plain, with content, subsections, warning/important, expandable, create action, collapsible rows, property rows.',
    render: () => <SectionsShowcase />,
  },
  {
    id: 'modal',
    name: 'Modal',
    category: 'Surfaces',
    description: 'Error handling modal and standard modal (600×500, header with expand/title/close, scrollable body, sticky footer with 0–2 buttons). Responsive: 80% viewport.',
    render: () => <ModalShowcase />,
  },
  {
    id: 'slideover',
    name: 'Slideover',
    category: 'Surfaces',
    description: 'Panel from the right, full height, overlay. Header (Back + title), scrollable body, optional footer (0, 1, or 2 buttons).',
    render: () => <SlideoverShowcase />,
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Content',
    description: 'Card: title, subtitle, description, icon, arrow, button, selected/inactive, hover and active states.',
    render: () => <CardShowcase />,
  },
  {
    id: 'kpi-panels',
    name: 'KPI Panels',
    category: 'Content',
    description: 'KpiBox variants (status, number with comparison, bar chart, diverging bar chart) inside Sections. Configurable grid. Presentation only; data via props.',
    render: () => <KpiShowcase />,
  },
  {
    id: 'data-table',
    name: 'Data Table',
    category: 'Content',
    description: 'ArborDataTable (AG Grid): collapsible section, toolbar (bulk action, hide columns, search, download), row selection, pagination, footer. Verify with Rowmantic agent.',
    render: () => <TableShowcase />,
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'Progress & Validation',
    description: 'Info, error, warning, success. Info and success auto-dismiss in 2s; warning and error stay until close.',
    render: () => <ToastShowcase />,
  },
  {
    id: 'banner',
    name: 'Banner',
    category: 'Progress & Validation',
    description: 'System, info, warning, error. Title, icon, and one or two actions. Not dismissible.',
    render: () => <BannerShowcase />,
  },
  {
    id: 'placeholder-heading',
    name: 'Heading (placeholder)',
    category: 'Content',
    description: 'Replace with real Heading from Components/heading/Heading.',
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Heading 1</h1>
        <h2 style={{ margin: 0, fontSize: 20 }}>Heading 2</h2>
        <h3 style={{ margin: 0, fontSize: 18 }}>Heading 3</h3>
      </div>
    ),
  },
];
