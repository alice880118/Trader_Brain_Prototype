import { useState } from "react";
import svg1 from "../../imports/GetStartedCards/svg-6rcee5hk5a";
import imgCard1 from "../../imports/img.png";
import imgCard2 from "../../imports/img-1.png";
import imgCard3 from "../../imports/img-2.png";

// ── Navigation ────────────────────────────────────────────────────────────────
function ChevronBtn({ disabled, onClick }: { disabled?: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      style={{ width: 28, height: 20, borderRadius: 12, border: disabled ? "1px solid #373737" : "1px solid #dbfd5c", background: disabled ? "transparent" : "#dbfd5c", display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <div style={{ width: 18, height: 18, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: "20.82% 37.62% 20.83% 37.38%" }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 4.50011 10.5022">
            <path d={svg1.p2416a710} fill={disabled ? "rgba(255,255,255,0.43)" : "rgba(0,0,0,0.8)"} />
          </svg>
        </div>
      </div>
    </button>
  );
}

function PrevBtn({ disabled, onClick }: { disabled?: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      style={{ width: 28, height: 20, borderRadius: 12, border: "1px solid #373737", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <div style={{ width: 18, height: 18, overflow: "hidden", position: "relative", transform: "rotate(180deg)" }}>
        <div style={{ position: "absolute", inset: "20.82% 37.62% 20.83% 37.38%" }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 4.50011 10.5022">
            <path d={svg1.p2416a710} fill="rgba(255,255,255,0.43)" />
          </svg>
        </div>
      </div>
    </button>
  );
}

// ── Card Header ───────────────────────────────────────────────────────────────
function CardHeader({ num, title, onClose }: { num: string; title: string; onClose: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 20, height: 20, background: "#dbfd5c", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13, lineHeight: "22px", color: "#000", textAlign: "center" }}>{num}</span>
        </div>
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, lineHeight: "22px", color: "#fff", whiteSpace: "nowrap" }}>{title}</span>
      </div>
      <button type="button" onClick={onClose} style={{ width: 13, height: 13, overflow: "hidden", position: "relative", background: "transparent", border: 0, cursor: "pointer", padding: 0 }}>
        <div style={{ position: "absolute", inset: "16.27% 16.64% 17.01% 16.6%" }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 8.67879 8.67299">
            <path d={svg1.pa025670} fill="white" fillOpacity="0.9" />
          </svg>
        </div>
      </button>
    </div>
  );
}

// ── Card 1: Conversation ──────────────────────────────────────────────────────
function Card1({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", width: "100%" }}>
      <CardHeader num="01" title="Conversation" onClose={onClose} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexShrink: 0 }}>
        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.7)", width: 171, margin: 0 }}>Share your trading habits with Brain.</p>
        <div style={{ width: 79, height: 69, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={imgCard1} alt="Conversation" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

// ── Card 2: Trade History ─────────────────────────────────────────────────────
function Card2({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", width: "100%" }}>
      <CardHeader num="02" title="Trade History" onClose={onClose} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexShrink: 0 }}>
        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.7)", width: 171, margin: 0 }}>Your trades help Brain understand your trading behavior.</p>
        <div style={{ width: 79, height: 69, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={imgCard2} alt="Trade History" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

// ── Card 3: Model Growth ──────────────────────────────────────────────────────
function Card3({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", width: "100%" }}>
      <CardHeader num="03" title="Model Growth" onClose={onClose} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexShrink: 0 }}>
        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.7)", width: 171, margin: 0 }}>More data unlocks smarter insights and recommendations.</p>
        <div style={{ width: 79, height: 69, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={imgCard3} alt="Model Growth" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

// ── Main overlay component ────────────────────────────────────────────────────
export function QuickStartOverlay({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (next: number) => {
    if (animating) return;
    setAnimating(true);
    setIndex(next);
    setTimeout(() => setAnimating(false), 320);
  };

  const cards = [
    <Card1 key={0} onClose={onClose} />,
    <Card2 key={1} onClose={onClose} />,
    <Card3 key={2} onClose={onClose} />,
  ];

  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 34, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(6,7,10,.5)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "100%", borderRadius: 12, border: "1px solid rgba(255,255,255,0.35)", background: "#151617", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>

        {/* Sliding cards */}
        <div style={{ overflow: "hidden", width: "100%" }}>
          <div style={{ display: "flex", transition: "transform 300ms cubic-bezier(.22,1,.36,1)", transform: `translateX(${-index * 100}%)`, willChange: "transform" }}>
            {cards.map((card, i) => (
              <div key={i} style={{ flexShrink: 0, width: "100%" }}>
                {card}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexShrink: 0 }}>
          <PrevBtn disabled={index === 0} onClick={() => go(index - 1)} />
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,0.6)", margin: 0, textAlign: "center" }}>
            <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{index + 1}</span>
            <span style={{ color: index === 2 ? "#fff" : "rgba(255,255,255,0.4)" }}>/3</span>
          </p>
          {index < 2
            ? <ChevronBtn onClick={() => go(index + 1)} />
            : (
              <button type="button" onClick={onClose}
                style={{ height: 20, padding: "0 10px", borderRadius: 12, background: "#dbfd5c", border: 0, cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 12, color: "rgba(0,0,0,0.8)", whiteSpace: "nowrap" }}>
                Finish
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
}
