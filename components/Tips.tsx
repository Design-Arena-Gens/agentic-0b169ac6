import React from 'react';

export function Tips({ language }: { language: 'en' | 'no' }) {
  const isNo = language === 'no';
  return (
    <div className="tips">
      <div className="tip">
        <strong>{isNo ? 'Spr?k' : 'Language'}:</strong> {isNo ? 'Nevn at du er komfortabel med enkel norsk/engelsk for lagerarbeid.' : 'Mention you can communicate in simple Norwegian/English for warehouse tasks.'}
      </div>
      <div className="tip">
        <strong>{isNo ? 'CV' : 'CV'}:</strong> {isNo ? 'Hold det kort (1 side). Fremhev erfaring med varep?fylling, logistikk, truck (T1?T4).' : 'Keep it to 1 page. Highlight shelf stocking, logistics, forklift (T1?T4).'}
      </div>
      <div className="tip">
        <strong>{isNo ? 'Steder' : 'Places'}:</strong> {isNo ? 'Oslo, Bergen, Trondheim, Stavanger, Drammen, Gardermoen (lager).' : 'Oslo, Bergen, Trondheim, Stavanger, Drammen, Gardermoen (warehouses).'}
      </div>
      <div className="tip">
        <strong>{isNo ? 'Sertifikat' : 'Certs'}:</strong> {isNo ? 'Truckf?rerbevis og HMS-kurs gir fortrinn.' : 'Forklift license and basic HSE course help you stand out.'}
      </div>
    </div>
  );
}
