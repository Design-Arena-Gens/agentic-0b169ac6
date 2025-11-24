"use client";

import React from 'react';
import { JobLinkList, type SearchState } from '@/components/JobLinkCard';
import { Tips } from '@/components/Tips';

function useSearchState(): [SearchState, (next: Partial<SearchState>) => void] {
  const params = React.useMemo(() => new URLSearchParams(typeof window !== 'undefined' ? window.location.search : ''), []);
  const initial: SearchState = {
    keyword: params.get('q') || 'stocker',
    city: params.get('city') || '',
    language: (params.get('lang') as 'en' | 'no') || 'en',
    contract: (params.get('contract') as 'any' | 'fulltime' | 'parttime') || 'any'
  };
  const [state, setState] = React.useState<SearchState>(initial);

  const update = (next: Partial<SearchState>) => {
    setState((prev) => {
      const merged = { ...prev, ...next };
      const sp = new URLSearchParams();
      if (merged.keyword) sp.set('q', merged.keyword);
      if (merged.city) sp.set('city', merged.city);
      if (merged.language) sp.set('lang', merged.language);
      if (merged.contract && merged.contract !== 'any') sp.set('contract', merged.contract);
      const url = `${window.location.pathname}?${sp.toString()}`;
      window.history.replaceState({}, '', url);
      return merged;
    });
  };

  return [state, update];
}

export default function Page() {
  const [state, update] = useSearchState();

  const downloadCv = () => {
    const text = `Name:\nLocation: Norway\nPhone: \nEmail: \n\nProfile:\nDependable warehouse/stocker with strong pace and accuracy. Flexible shifts.\n\nSkills:\n- Shelf replenishment and facing\n- Receiving, picking, packing\n- Pallet jack, forklift (T1?T4 if any)\n- Basic Norwegian/English communication\n\nExperience:\nCompany ? Role ? Dates\n- Key responsibilities and outcomes\n\nEducation & Certificates:\n- Forklift license (if any)\n- HSE basics (if any)\n`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'CV-template-stocker.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <div className="logo" />
          <div>
            <h1>Norway Stocker Jobs</h1>
            <div className="sub">Quick links, filters, and practical tips</div>
          </div>
        </div>
        <button className="button" onClick={downloadCv}>
          Download 1-page CV template
        </button>
      </header>

      <main className="grid" style={{ marginTop: 18 }}>
        <section className="card">
          <div className="inputRow">
            <input
              className="input"
              placeholder="Keyword (e.g., stocker, warehouse, retail)"
              value={state.keyword}
              onChange={(e) => update({ keyword: e.target.value })}
            />
            <input
              className="input"
              placeholder="City (optional, e.g., Oslo)"
              value={state.city}
              onChange={(e) => update({ city: e.target.value })}
            />
          </div>
          <div className="inputRow" style={{ marginTop: 12 }}>
            <select
              className="select"
              value={state.language}
              onChange={(e) => update({ language: e.target.value as 'en' | 'no' })}
            >
              <option value="en">English</option>
              <option value="no">Norsk</option>
            </select>
            <select
              className="select"
              value={state.contract}
              onChange={(e) => update({ contract: e.target.value as SearchState['contract'] })}
            >
              <option value="any">Any contract</option>
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
            </select>
          </div>
        </section>

        <section className="card">
          <h3 style={{ marginTop: 0 }}>Quick tips</h3>
          <Tips language={state.language} />
        </section>
      </main>

      <section className="card" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Search on top sites</h3>
        <JobLinkList state={state} />
      </section>

      <div className="footer">Built for fast job discovery. Good luck!</div>
    </div>
  );
}
