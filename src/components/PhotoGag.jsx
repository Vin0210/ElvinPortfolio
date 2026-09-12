import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs';

/**
 * Peeling-tape easter egg, isolated here. Hover (or tap) the photo to
 * work the tape loose: left strip drops at 3, right at 6, the photo
 * itself at 8. Fallen pieces rest where they land in document
 * coordinates, so they stay put across sections until snapped back,
 * re-taped via the caption button, or the page reloads.
 *
 * Someone who never hovers repeatedly never notices any of this.
 */

const DRIFTS = { tapeL: -60, tapeR: 60, photo: 12 };
const LAND_ROTS = { tapeL: 58, tapeR: -62, photo: 7 };
const SNAP_RADIUS = 90;

const freshPieces = () => ({
  tapeL: { status: 'attached', dx: 0, dy: 0, rot: 0, home: null },
  tapeR: { status: 'attached', dx: 0, dy: 0, rot: 0, home: null },
  photo: { status: 'attached', dx: 0, dy: 0, rot: 0, home: null },
});

const PhotoGag = () => {
  const reduced = usePrefersReducedMotion();
  const [hits, setHits] = useState(0);
  const [pieces, setPieces] = useState(freshPieces);
  const origRefs = useRef({});
  const fallenRefs = useRef({});
  const animsRef = useRef({});
  const fallAnimsRef = useRef({});
  const dragRef = useRef(null);
  const lastEnter = useRef(0);
  const droppedOnce = useRef(new Set());

  const peelL = hits >= 2 ? 2 : hits >= 1 ? 1 : 0;
  const peelR = hits >= 5 ? 2 : hits >= 4 ? 1 : 0;
  const loose = hits >= 6 && pieces.photo.status === 'attached';
  const fallenIds = Object.keys(pieces).filter((id) => pieces[id].status !== 'attached');

  const countHit = () => {
    if (!reduced && hits < 8) setHits((h) => Math.min(h + 1, 8));
  };

  const onMouseEnter = () => {
    lastEnter.current = Date.now();
    countHit();
  };

  // Touch has no hover: a deliberate tap counts, unless it immediately
  // followed a mouseenter (mobile browsers fire both).
  const onFigureClick = () => {
    if (Date.now() - lastEnter.current > 600) countHit();
  };

  // Thresholds detach each piece once. Snapping a piece back does not
  // re-trigger it — only a full reset (hits back to 0) re-arms the gag.
  useEffect(() => {
    if (reduced) return;
    const jobs = [];
    if (hits >= 3) jobs.push('tapeL');
    if (hits >= 6) jobs.push('tapeR');
    if (hits >= 8) jobs.push('photo');
    jobs.forEach((id) => {
      if (droppedOnce.current.has(id)) return;
      droppedOnce.current.add(id);
      setPieces((prev) => {
        if (prev[id].status !== 'attached') return prev;
        const el = origRefs.current[id];
        if (!el) return prev;
        const r = el.getBoundingClientRect();
        return {
          ...prev,
          [id]: {
            ...prev[id],
            status: 'falling',
            home: { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height },
          },
        };
      });
    });
  }, [hits, reduced]);

  // Gravity pass: accelerate down with a little rotation, one gentle
  // settle at the end. Weight, not bounce. The photo always plunges to
  // the footer, but tapes are sticky — each one catches on a random
  // section (about, work, skills, background, contact) on the way down.
  // Duration scales with distance so long falls still read.
  useEffect(() => {
    // One fall at a time: a queued piece holds still (looking attached)
    // until whatever is mid-air lands, then it goes.
    const busy = Object.values(fallAnimsRef.current).some(
      (a) => a && a.playState === 'running'
    );
    if (busy) return;
    const job = Object.entries(pieces).find(([, p]) => p.status === 'falling' && p.home);
    if (!job) return;
    {
      const [id, p] = job;
      const el = fallenRefs.current[id];
      if (!el) return;
      let targetY;
      if (id === 'photo') {
        // The photo rests inside the footer — bottom-aligned to it so it
        // never lapses past the page end. Full size, never scaled.
        const footer = document.querySelector('.footer');
        targetY = footer
          ? footer.getBoundingClientRect().bottom + window.scrollY - p.home.h - 16
          : document.documentElement.scrollHeight - 170;
      } else {
        const zones = ['about', 'work', 'skills', 'background', 'contact'];
        const zone = document.getElementById(
          zones[Math.floor(Math.random() * zones.length)]
        );
        targetY = zone
          ? zone.getBoundingClientRect().top + window.scrollY + 140
          : document.documentElement.scrollHeight - 170;
      }
      const dy = Math.max(200, targetY - p.home.y);
      if (!Number.isFinite(dy)) return; // never let bad geometry blank the page
      const dx = DRIFTS[id];
      const rot = LAND_ROTS[id];
      const anim = el.animate(
        [
          { transform: 'translate(0px, 0px) rotate(0deg)', opacity: 1 },
          {
            transform: `translate(${dx * 0.2}px, ${dy * 0.25}px) rotate(${rot * 0.3}deg)`,
            opacity: 1,
            offset: 0.35,
          },
          {
            transform: `translate(${dx * 0.7}px, ${dy * 0.6}px) rotate(${rot * 0.7}deg)`,
            opacity: 1,
            offset: 0.65,
          },
          {
            transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`,
            opacity: 1,
            offset: 0.88,
          },
          {
            transform: `translate(${dx}px, ${dy - 12}px) rotate(${rot - 3}deg)`,
            opacity: 1,
            offset: 0.94,
          },
          { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity: 1 },
        ],
        {
          duration: Math.min(3200, Math.round(900 + dy * 0.9)),
          easing: 'ease-in',
          fill: 'forwards',
        }
      );
      fallAnimsRef.current[id] = anim;
      anim.onfinish = () => {
        fallAnimsRef.current[id] = null;
        setPieces((prev) => {
          const cur = prev[id];
          if (cur.status !== 'falling') return prev;
          return { ...prev, [id]: { ...cur, status: 'resting', dx, dy, rot } };
        });
      };
    }
  }, [pieces]);

  const flyHome = (id, from) =>
    new Promise((resolve) => {
      const el = fallenRefs.current[id];
      if (!el) {
        resolve();
        return;
      }
      animsRef.current[id]?.cancel();
      const anim = el.animate(
        [
          { transform: `translate(${from.dx}px, ${from.dy}px) rotate(${from.rot}deg)` },
          { transform: 'translate(0px, 0px) rotate(0deg)' },
        ],
        { duration: 320, easing: 'ease-out', fill: 'forwards' }
      );
      anim.onfinish = () => {
        anim.cancel();
        resolve();
      };
    });

  const attach = (id) =>
    setPieces((prev) => ({ ...prev, [id]: { ...freshPieces()[id] } }));

  // Quiet reset: the fallen-state caption becomes a "tape it back" button.
  const resetAll = async () => {
    const resting = Object.entries(pieces)
      .filter(([, p]) => p.status !== 'attached')
      .map(([id, p]) => [id, { dx: p.dx, dy: p.dy, rot: p.rot }]);
    await Promise.all(resting.map(([id, from]) => flyHome(id, from)));
    droppedOnce.current.clear();
    setPieces(freshPieces());
    setHits(0);
  };

  const onWindowMove = (e) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pid) return;
    // Pieces live in document coordinates but the pointer reports
    // viewport coordinates — fold scroll drift back in or the piece
    // slides away whenever the page moves mid-drag.
    const dx = d.ox + (e.clientX - d.sx) + (window.scrollX - d.bx);
    const dy = d.oy + (e.clientY - d.sy) + (window.scrollY - d.by);
    d.lx = dx;
    d.ly = dy;
    setPieces((prev) => {
      const cur = prev[d.id];
      if (!cur || cur.status !== 'dragging') return prev;
      return { ...prev, [d.id]: { ...cur, dx, dy } };
    });
  };

  const endDrag = (e) => {
    const d = dragRef.current;
    dragRef.current = null;
    window.removeEventListener('pointermove', onWindowMove);
    if (!d) return;
    const dx = e && e.clientX !== undefined ? d.ox + (e.clientX - d.sx) + (window.scrollX - d.bx) : d.lx ?? d.ox;
    const dy = e && e.clientY !== undefined ? d.oy + (e.clientY - d.sy) + (window.scrollY - d.by) : d.ly ?? d.oy;
    if (Math.hypot(dx, dy) < SNAP_RADIUS) {
      flyHome(d.id, { dx, dy, rot: pieces[d.id]?.rot || 0 }).then(() => attach(d.id));
    } else {
      setPieces((prev) => {
        const cur = prev[d.id];
        if (!cur) return prev;
        return { ...prev, [d.id]: { ...cur, status: 'resting', dx, dy } };
      });
    }
  };

  const onPieceDown = (e, id) => {
    const p = pieces[id];
    if (!p || p.status === 'attached' || !p.home || dragRef.current) return;
    e.preventDefault();
    // Measure BEFORE releasing anything: getBoundingClientRect reflects
    // the live on-screen position (even mid-fall), so the piece is
    // grabbed exactly where the eye sees it.
    const r = e.currentTarget.getBoundingClientRect();
    const m = new DOMMatrixReadOnly(getComputedStyle(e.currentTarget).transform);
    const dx = r.left + window.scrollX - p.home.x;
    const dy = r.top + window.scrollY - p.home.y;
    const rot = Math.round((Math.atan2(m.b, m.a) * 180) / Math.PI);
    // Cancel EVERYTHING affecting this element — finished fills, stray
    // duplicates — not just the one animation we tracked. Any leftover
    // filler overriding the drag transform is what glues a piece down.
    e.currentTarget.getAnimations().forEach((a) => a.cancel());
    fallAnimsRef.current[id] = null;
    animsRef.current[id] = null;
    dragRef.current = { id, pid: e.pointerId, sx: e.clientX, sy: e.clientY, ox: dx, oy: dy, lx: dx, ly: dy, bx: window.scrollX, by: window.scrollY };
    setPieces((prev) => {
      const cur = prev[id];
      if (!cur || cur.status === 'attached') return prev;
      return { ...prev, [id]: { ...cur, status: 'dragging', dx, dy, rot } };
    });
  // Window-level tracking: works with or without pointer capture,
    // mouse or touch — the gesture can't get lost. Listeners are added
    // once per grab and always removed on release.
    const finish = (ev) => {
      window.removeEventListener('pointermove', onWindowMove);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
      endDrag(ev);
    };
    window.addEventListener('pointermove', onWindowMove);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
  };

  const gone = (id) => (pieces[id].status === 'attached' ? '' : ' is-gone');

  return (
    <div className="hero-visual">
      <figure className="hero-photo" onMouseEnter={onMouseEnter} onClick={onFigureClick}>
        <span
          ref={(el) => {
            origRefs.current.tapeL = el;
          }}
          className={`tape tape-l${peelL === 2 ? ' peel-2' : peelL === 1 ? ' peel-1' : ''}${gone('tapeL')}`}
          aria-hidden="true"
        />
        <span
          ref={(el) => {
            origRefs.current.tapeR = el;
          }}
          className={`tape tape-r${peelR === 2 ? ' peel-2' : peelR === 1 ? ' peel-1' : ''}${gone('tapeR')}`}
          aria-hidden="true"
        />
        <img
          ref={(el) => {
            origRefs.current.photo = el;
          }}
          src="/images/elvin.jpg"
          alt="Elvin Ramos"
          loading="eager"
          className={`${loose ? 'wobble' : ''}${gone('photo')}`}
        />
        {fallenIds.length > 0 ? (
          <button className="hero-photo-caption as-btn" onClick={resetAll}>
            {pieces.photo.status !== 'attached'
              ? 'and there goes the photo. tape it back.'
              : 'uh oh. tape it back.'}
          </button>
        ) : (
          <figcaption className="hero-photo-caption">
            elvin ramos — zamboanga city, 2025
          </figcaption>
        )}
      </figure>
      <p className="hero-note" aria-hidden="true">
        {'// probably in VS Code right now'}
      </p>

      {typeof document !== 'undefined' &&
        createPortal(
          <div className="fallen-layer" aria-hidden="true">
            {Object.entries(pieces).map(([id, p]) => {
              if (p.status === 'attached' || !p.home) return null;
              return (
                <div
                  key={id}
                  ref={(el) => {
                    fallenRefs.current[id] = el;
                  }}
                  className={`fallen-piece${p.status === 'dragging' ? ' is-drag' : ''}`}
                  style={{
                    left: p.home.x,
                    top: p.home.y,
                    width: p.home.w,
                    transform: `translate(${p.dx}px, ${p.dy}px) rotate(${
                      p.status === 'falling' ? 0 : p.rot
                    }deg)`,
                  }}
                  onPointerDown={(e) => onPieceDown(e, id)}
                >
                  {id === 'photo' ? (
                    <img src="/images/elvin.jpg" alt="" draggable={false} />
                  ) : (
                    <span className={`tape ${id === 'tapeL' ? 'tape-l' : 'tape-r'}`} />
                  )}
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
};

export default React.memo(PhotoGag);
