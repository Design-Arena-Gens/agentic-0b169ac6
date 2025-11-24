"use client";

import React from 'react';

export type SearchState = {
  keyword: string;
  city: string;
  language: 'en' | 'no';
  contract: 'any' | 'fulltime' | 'parttime';
};

function q(v: string) { return encodeURIComponent(v.trim()); }

function buildUrls(state: SearchState) {
  const keyword = state.keyword || 'stocker';
  const city = state.city;
  const location = city ? `${city}, Norway` : 'Norway';
  const fullQuery = [keyword, 'warehouse'].join(' ');
  const lang = state.language === 'no' ? 'no' : 'en';
  const ft = state.contract === 'fulltime';
  const pt = state.contract === 'parttime';

  return [
    {
      name: 'LinkedIn Jobs',
      url: `https://www.linkedin.com/jobs/search/?keywords=${q(fullQuery)}&location=${q(location)}${ft ? '&f_JT=F' : ''}${pt ? '&f_JT=P' : ''}`,
      badge: 'broad'
    },
    {
      name: 'FINN.no',
      url: `https://www.finn.no/job/fulltime/search.html?abTestKey=job__search&occupation=0.23&keyword=${q(fullQuery)}${city ? `&location=${q(city)}` : ''}`,
      badge: 'popular in NO'
    },
    {
      name: 'Arbeidsplassen (NAV)',
      url: `https://arbeidsplassen.nav.no/stillinger?query=${q(fullQuery)}${city ? `&municipal=${q(city)}` : ''}`,
      badge: 'official'
    },
    {
      name: 'Indeed',
      url: `https://no.indeed.com/jobs?q=${q(fullQuery)}&l=${q(location)}${ft ? '&jt=fulltime' : ''}${pt ? '&jt=parttime' : ''}`,
      badge: 'aggregator'
    },
    {
      name: 'Glassdoor',
      url: `https://www.glassdoor.com/Job/norway-${q(keyword)}-jobs-SRCH_IL.0,6_IN178_KO7,${7 + keyword.length}.htm`,
      badge: 'extra'
    }
  ];
}

export function JobLinkList({ state }: { state: SearchState }) {
  const links = buildUrls(state);
  return (
    <div className="links">
      {links.map((l) => (
        <a key={l.name} className="linkItem" href={l.url} target="_blank" rel="noreferrer">
          <div>
            <div style={{ fontWeight: 600 }}>{l.name}</div>
            <div className="sub" style={{ fontSize: 13 }}>Opens in a new tab with your filters</div>
          </div>
          <span className="badge">{l.badge}</span>
        </a>
      ))}
    </div>
  );
}
