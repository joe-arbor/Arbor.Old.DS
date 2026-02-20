import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopNav } from '../../components/topNav';
import { Slideover } from '../../components/slideover';
import { Section } from '../../components/section/Section';
import { Button } from '../../components/button/Button';
import './templatePage.scss';

/**
 * Placeholder Behaviour (MIS-style) template.
 * Top nav is always present; Ask Arbor opens the AI slideover.
 */
export function BehaviourTemplate() {
  const [askArborOpen, setAskArborOpen] = useState(false);

  return (
    <div className="template-page">
      <TopNav
        searchPlaceholder="Search or ask..."
        onAskArborClick={() => setAskArborOpen(true)}
      />
      <div className="template-page__inner">
        <header className="template-page__header">
          <Link to="/templates" className="template-page__back">
            ← Back to templates
          </Link>
          <h1 className="template-page__title">Behaviour</h1>
          <p className="template-page__description">
            MIS-style behaviour page. Build this out with design system components.
          </p>
        </header>
        <Section title="Placeholder section" expandable defaultExpanded>
          <p className="template-page__placeholder">
            Add filters, tables, and actions here using components from the design system.
            When you need a new component, add it under <code>src/components/</code> and
            optionally add a showcase for it in Components.
          </p>
          <Button variant="primary" onClick={() => {}}>
            Primary action
          </Button>
        </Section>
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
