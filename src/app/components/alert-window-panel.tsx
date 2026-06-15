import { useState } from "react";
import svgPaths from "../../imports/AlertWindow/svg-298aezmdge";

const SCROLL_CSS = `
.alert-scroll::-webkit-scrollbar { width: 4px; }
.alert-scroll::-webkit-scrollbar-track { background: transparent; }
.alert-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 999px; }
.alert-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.28); }
`;

const ORANGE = "#F59E0B";
const ORANGE_DIM = "rgba(245, 158, 11, 0.55)";
const ORANGE_GLOW = "rgba(245, 158, 11, 0.35)";

const SIGNALS = [
  { title: "High Leverage Detected", desc: "Current leverage exceeds your typical trading behavior." },
  { title: "Position Size Spike", desc: "This position is significantly larger than your usual trades." },
  { title: "No Stop-Loss Configured", desc: "Consider defining downside risk before entering." },
  { title: "Concentrated Exposure", desc: "Most of your available capital is allocated to one position." },
  { title: "Potential Revenge Trading", desc: "Position size increased shortly after a recent loss." },
];

function RiskSignalIcon() {
  return (
    <img
      src="/risk-signal-icon.png"
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      style={{ display: "block", flexShrink: 0, objectFit: "contain" }}
    />
  );
}

function CloseIcon() {
  return (
    <div style={{ width: 14, height: 14, overflow: "hidden" }} data-name="close">
      <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 9.34639 9.34014">
        <path d={svgPaths.p3fa82c00} fill="white" fillOpacity="0.5" />
      </svg>
    </div>
  );
}

function SignalCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      data-name="Alert card"
      style={{
        background: "rgba(28, 25, 23, 0.95)",
        borderRadius: 12,
        border: `1px solid ${ORANGE_DIM}`,
        padding: "12px 14px",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14, lineHeight: "20px", color: "#fff", flex: 1, minWidth: 0 }}>
          {title}
        </span>
        <span
          data-name="Alert tag"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: 11,
            lineHeight: "16px",
            color: ORANGE,
            background: "rgba(245, 158, 11, 0.12)",
            padding: "2px 10px",
            borderRadius: 4,
            letterSpacing: "0.04em",
            flexShrink: 0,
          }}
        >
          HIGH
        </span>
      </div>
      <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,0.55)" }}>
        {desc}
      </p>
    </div>
  );
}

function ExpandRow({ onExpand }: { onExpand: () => void }) {
  return (
    <button
      type="button"
      data-name="Expansion panel"
      onClick={onExpand}
      style={{
        width: "100%",
        height: 36,
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.04)",
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,0.55)" }}>
        +3 more risk signals
      </span>
      <div style={{ width: 18, height: 18, transform: "rotate(180deg)", flexShrink: 0 }}>
        <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 10.4975 4.50012">
          <path d={svgPaths.p23a1f780} fill="white" fillOpacity="0.45" />
        </svg>
      </div>
    </button>
  );
}

interface Props {
  expanded: boolean;
  onExpand: () => void;
}

export function AlertWindowPanel({ expanded, onExpand }: Props) {
  const visible = expanded ? SIGNALS : SIGNALS.slice(0, 2);

  return (
    <div
      data-name="Alert window"
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 20,
        borderRadius: 16,
        position: "relative",
        background: "#121419",
        border: `1px solid ${ORANGE}`,
        boxShadow: `0 0 24px ${ORANGE_GLOW}, inset 0 0 32px rgba(245, 158, 11, 0.08)`,
        fontFamily: "Poppins, sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{SCROLL_CSS}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RiskSignalIcon />
          <span style={{ fontWeight: 700, fontSize: 16, lineHeight: "20px", color: "#fff" }}>Risk Signal</span>
        </div>
        <button
          type="button"
          aria-label="Close"
          data-name="close"
          style={{ width: 23, height: 23, padding: 8, border: 0, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <CloseIcon />
        </button>
      </div>

      {expanded ? (
        <div
          className="alert-scroll"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingRight: 4,
            marginRight: -4,
            maskImage: "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
          }}
        >
          {visible.map((s, i) => (
            <SignalCard key={i} title={s.title} desc={s.desc} />
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minHeight: 0 }}>
          {visible.map((s, i) => (
            <SignalCard key={i} title={s.title} desc={s.desc} />
          ))}
          <ExpandRow onExpand={onExpand} />
        </div>
      )}
    </div>
  );
}

export const ALERT_W = 380;
export const ALERT_H = 300;
export const ALERT_H_EXPANDED = 480;

const DESIGN_W = 1920;
const DESIGN_H = 1080;
const BRAIN_MARGIN = 48;
const ALERT_LEFT = DESIGN_W - BRAIN_MARGIN - ALERT_W;
const BRAIN_ICON_BOTTOM = DESIGN_H - BRAIN_MARGIN;

/** Rendered above Brain widget (z-index 250) so Risk Signal covers the launcher icon. */
export function CriticalSignalOverlay({ scale, onClose }: { scale: number; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);

  const alertH = expanded ? ALERT_H_EXPANDED : ALERT_H;
  const alertTop = BRAIN_ICON_BOTTOM - alertH;

  return (
    <div
      style={{
        position: "absolute",
        left: ALERT_LEFT * scale,
        top: alertTop * scale,
        width: ALERT_W,
        height: alertH,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        zIndex: 250,
        pointerEvents: "auto",
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => { e.stopPropagation(); if ((e.target as HTMLElement).closest('[data-name="close"]')) onClose(); }}
    >
      <AlertWindowPanel expanded={expanded} onExpand={() => setExpanded(true)} />
    </div>
  );
}
