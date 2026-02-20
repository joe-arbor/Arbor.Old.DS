import React, { useState } from 'react';
import { TopNav } from '../../components/topNav';
import { Slideover } from '../../components/slideover';
import './topNavShowcase.scss';

export function TopNavShowcase() {
  const [askArborOpen, setAskArborOpen] = useState(false);
  const [lastSearch, setLastSearch] = useState<string | null>(null);

  return (
    <div className="top-nav-showcase">
      <p className="top-nav-showcase__intro">
        Top navigation for the MIS template: school logo, menu items (My Items, Students, School, Reporting, System),
        search bar with fully rounded corners, Ask Arbor button (opens AI slideover), and Arbor logo. The bar is
        always present with a dark gradient background.
      </p>

      <div className="top-nav-showcase__demo">
        <div className="top-nav-showcase__demo-inner">
          <TopNav
            searchPlaceholder="Search or ask..."
            onSearch={(value) => setLastSearch(value)}
            onAskArborClick={() => setAskArborOpen(true)}
          />
        </div>
      </div>

      {lastSearch !== null && (
        <p className="top-nav-showcase__result" role="status">
          Last search: <strong>{lastSearch || '(empty)'}</strong>
        </p>
      )}

      <Slideover
        open={askArborOpen}
        onClose={() => setAskArborOpen(false)}
        title="Ask Arbor"
      >
        <p>Start a conversation with the AI-powered tool here. This slideover is opened from the Ask Arbor button in the top nav.</p>
      </Slideover>
    </div>
  );
}
