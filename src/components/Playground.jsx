import React, { useState } from 'react';
import Kicker from './Kicker';
import { generateResponse } from './Chatbot/geminiService';
import './Playground.css';

const PRESETS = [
  { id: 'summarize', label: 'summarize', prompt: 'Summarize this in 2 bullet points:\n\n' },
  { id: 'classify', label: 'classify intent', prompt: 'Classify the intent of this message as hiring, freelance, question, or spam. Reply with the label + one line why:\n\n' },
  { id: 'rewrite', label: 'rewrite pro', prompt: 'Rewrite this message professionally in 2 sentences max:\n\n' },
];

const Playground = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState(PRESETS[0]);

  const run = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setLoading(true);
    setOutput('');
    try {
      const reply = await generateResponse(`${preset.prompt}${text}`, []);
      setOutput(reply);
    } catch {
      setOutput('AI unavailable right now — try again, or ask VinByte (bottom-right) instead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="playground" className="playground section-padding" aria-labelledby="playground-heading">
      <div className="section-inner">
        <Kicker index="06" label="playground" />
        <h2 id="playground-heading" className="section-title">
          Try the <em>AI.</em>
        </h2>
        <p className="section-lede">
          Live calls to the same serverless function as the chatbot — no key
          in the browser, rate-limited, with offline fallback. Paste an
          inquiry and pick a task.
        </p>

        <div className="play-grid">
          <form className="play-input-card" onSubmit={run}>
            <div className="play-presets" role="tablist" aria-label="Task presets">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={preset.id === p.id}
                  className={`preset-btn ${preset.id === p.id ? 'active' : ''}`}
                  onClick={() => setPreset(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <label className="play-label" htmlFor="play-input">input</label>
            <textarea
              id="play-input"
              className="play-textarea"
              rows="6"
              placeholder="e.g. Hi, we need a chatbot for our clinic that answers FAQs and books appointments…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
            />
            <button type="submit" className="btn-primary" disabled={!input.trim() || loading}>
              {loading ? 'running…' : `run → ${preset.label}`}
            </button>
          </form>

          <div className="play-output-card" aria-live="polite">
            <p className="play-label">output</p>
            {loading ? (
              <p className="play-output loading">
                <span className="typing-dots" aria-hidden="true"><span /><span /><span /></span>
                thinking…
              </p>
            ) : output ? (
              <p className="play-output">{output}</p>
            ) : (
              <p className="play-output muted">Output appears here. Same model pipeline as VinByte.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Playground);
