import React from 'react';
import Kicker from './Kicker';
import './Automations.css';

const FLOWS = [
  {
    id: 'inbox-triage',
    title: 'Inbox triage',
    flow: 'contact form → classify intent → route + draft reply',
    stack: ['EmailJS', 'Gemini API', 'REST'],
    outcome: '~30 min saved per inquiry batch',
    detail:
      'Every portfolio inquiry gets labeled (hire, freelance, question) before it hits my inbox. No more digging through spam to find the real leads.',
  },
  {
    id: 'registrar-alerts',
    title: 'Registrar & stock alerts',
    flow: 'MySQL cron → detect conflicts → email staff',
    stack: ['MySQL', 'Laravel', 'cron'],
    outcome: 'conflicts caught before enrollment day',
    detail:
      'Scheduled checks for room clashes, low stock, and expiring inventory across the school and clinic systems I maintain.',
  },
  {
    id: 'rag-chatbot',
    title: 'RAG portfolio assistant',
    flow: 'widget → offline intents → Gemini function → fallback',
    stack: ['React', 'Netlify Functions', 'Gemini'],
    outcome: 'live on this site — try the >_ button',
    detail:
      'VinByte answers portfolio questions instantly offline, escalates open questions to Gemini server-side, and never leaks a key.',
  },
  {
    id: 'booking-checks',
    title: 'Booking smoke checks',
    flow: 'Playwright → book a slot → alert on failure',
    stack: ['Playwright', 'Node.js', 'webhooks'],
    outcome: 'broken checkout found in minutes, not days',
    detail:
      'Nightly script books, cancels, and verifies availability on booking demos so regressions surface before users do.',
  },
];

const Automations = () => {
  return (
    <section id="automations" className="automations section-padding" aria-labelledby="automations-heading">
      <div className="section-inner">
        <Kicker index="03" label="automations" />
        <h2 id="automations-heading" className="section-title">
          Work that runs <em>itself.</em>
        </h2>
        <p className="section-lede">
          Four pipelines I run in production. Each one: trigger → AI or logic
          step → action, measured in hours saved — not lines of code.
        </p>

        <div className="flows-grid">
          {FLOWS.map((f) => (
            <article key={f.id} className="flow-card">
              <p className="flow-id mono">$ {f.id}</p>
              <h3 className="flow-title">{f.title}</h3>
              <p className="flow-path">{f.flow}</p>
              <p className="flow-detail">{f.detail}</p>
              <div className="flow-stack">
                {f.stack.map((s) => (
                  <span key={s} className="stack-item">{s}</span>
                ))}
              </div>
              <p className="flow-outcome">→ {f.outcome}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Automations);
