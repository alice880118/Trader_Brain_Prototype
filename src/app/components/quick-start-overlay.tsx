import { useState } from "react";
import svg1 from "../../imports/GetStartedCards/svg-6rcee5hk5a";
import imgCard1 from "../../imports/img.png";
import imgCard2 from "../../imports/img-1.png";
import imgCard3 from "../../imports/img-2.png";

const STEPS = [
  {
    num: "01",
    title: "Conversation",
    description: "Share your trading habits with Brain.",
    image: imgCard1,
    alt: "Conversation",
  },
  {
    num: "02",
    title: "Trade History",
    description: "Your trades help Brain understand your trading behavior.",
    image: imgCard2,
    alt: "Trade History",
  },
  {
    num: "03",
    title: "Model Growth",
    description: "More data unlocks smarter insights and recommendations.",
    image: imgCard3,
    alt: "Model Growth",
  },
] as const;

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

function CardBody({ description, image, alt }: { description: string; image: string; alt: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexShrink: 0, minHeight: 69 }}>
      <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.7)", width: 171, margin: 0 }}>{description}</p>
      <div style={{ width: 79, height: 69, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={image} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
    </div>
  );
}

export function QuickStartOverlay({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];

  return (
    <div onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: "absolute", inset: 0, zIndex: 34, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(6,7,10,.5)" }}>
      <div onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "100%", borderRadius: 12, border: "1px solid rgba(255,255,255,0.35)", background: "#151617", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>

        <CardHeader num={step.num} title={step.title} onClose={onClose} />

        <CardBody key={index} description={step.description} image={step.image} alt={step.alt} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexShrink: 0 }}>
          <PrevBtn disabled={index === 0} onClick={() => setIndex((i) => i - 1)} />
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,0.6)", margin: 0, textAlign: "center" }}>
            <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{index + 1}</span>
            <span style={{ color: index === 2 ? "#fff" : "rgba(255,255,255,0.4)" }}>/3</span>
          </p>
          {index < 2
            ? <ChevronBtn onClick={() => setIndex((i) => i + 1)} />
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
