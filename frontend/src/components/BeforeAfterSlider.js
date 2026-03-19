import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const BEFORE_IMG = "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/f8dfaf594ec260f033c47f22f125597451ccb0ff0aecf6ef2df31ef6f8b974fd.png";
const AFTER_IMG = "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/c0af39a7d1b28ff70c7ea9326aa6bd7cbfbd13d4877ac6517923a470aae4b59c.png";

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

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e) => { if (isDragging.current) handleMove(e.clientX); };
  const onTouchMove = (e) => { handleMove(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      data-testid="before-after-slider"
      className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-col-resize select-none"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      {/* AFTER image (full background) */}
      <img
        src={AFTER_IMG}
        alt="Après transformation - espace aménagé avec cloisons"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* BEFORE image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={BEFORE_IMG}
          alt="Avant transformation - espace ouvert sans cloisons"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${containerRef.current ? containerRef.current.offsetWidth : 0}px`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
      >
        <div className="w-0.5 h-full bg-white shadow-lg" />
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L3 10L7 16" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L17 10L13 16" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-brand-navy/80 text-white text-xs font-heading font-semibold tracking-wider uppercase px-3 py-1.5 backdrop-blur-sm">
          Avant
        </span>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <span className="bg-brand-gold/90 text-white text-xs font-heading font-semibold tracking-wider uppercase px-3 py-1.5 backdrop-blur-sm">
          Après
        </span>
      </div>
    </div>
  );
}
