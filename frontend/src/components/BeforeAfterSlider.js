import { useState, useRef, useCallback } from "react";

const BEFORE_IMG = "/portfolio/avant-chantier.jpg";
const AFTER_IMG = "/portfolio/apres-chantier.jpg";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const onTouchStart = (e) => {
    isDragging.current = true;
    handleMove(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      data-testid="before-after-slider"
      className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-[0_30px_80px_rgba(15,23,42,0.18)] cursor-col-resize select-none"
      aria-label="Comparer l'avant et l'après"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      <img
        src={AFTER_IMG}
        alt="Après chantier - espace finalisé et prêt à l'usage"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={BEFORE_IMG}
          alt="Avant transformation - espace ouvert sans cloisons"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${containerRef.current ? containerRef.current.offsetWidth : 0}px`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      <div className="absolute top-0 bottom-0 z-10" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
        <div className="h-full w-0.5 bg-white shadow-lg" />
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 4L3 10L7 16" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L17 10L13 16" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="absolute left-4 top-4 z-20">
        <span className="bg-brand-navy/80 px-3 py-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          Avant
        </span>
      </div>
      <div className="absolute right-4 top-4 z-20">
        <span className="bg-brand-gold/90 px-3 py-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          Après
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-brand-navy/90 via-brand-navy/65 to-transparent px-5 py-5 md:px-6">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
          Reconfiguration d'espace
        </p>
        <p className="max-w-md text-sm leading-relaxed text-slate-200">
          Faites glisser le repère pour comparer la situation avant travaux avec le rendu final après pose.
        </p>
      </div>
    </div>
  );
}
