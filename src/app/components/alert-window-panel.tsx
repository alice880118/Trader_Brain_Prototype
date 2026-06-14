import { useState } from "react";
import svgPaths from "../../imports/AlertWindow/svg-298aezmdge";

const SCROLL_CSS = `
.alert-scroll::-webkit-scrollbar { width: 4px; }
.alert-scroll::-webkit-scrollbar-track { background: transparent; }
.alert-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 999px; }
.alert-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.28); }
`;

const SIGNALS = [
  { title: "Revenge trading pattern detected", desc: "You tend to increase risk immediately after losses." },
  { title: "Revenge trading pattern detected", desc: "You tend to increase risk immediately after losses." },
  { title: "Revenge trading pattern detected", desc: "You tend to increase risk immediately after losses." },
  { title: "Revenge trading pattern detected", desc: "You tend to increase risk immediately after losses." },
  { title: "Revenge trading pattern detected", desc: "You tend to increase risk immediately after losses." },
];

function CriticalIcon() {
  return (
    <div style={{ width: 20, height: 20, position: "relative", flexShrink: 0, overflow: "hidden" }} data-name="CRITICAL">
      <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 20 20">
        <path d={svgPaths.p14e3b880} fill="#FF4144" fillOpacity="0.2" stroke="#FF4144" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" transform="translate(1 1) scale(1.05)" />
        <path d="M9.08 7.41V11.5" stroke="#FF4144" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <circle cx="10" cy="13.5" r="0.75" stroke="#FF4144" strokeWidth="1.5" />
      </svg>
    </div>
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
        background: "rgba(255,65,68,0.1)",
        borderRadius: 12,
        borderLeft: "1px solid #ff4144",
        borderRight: "1px solid #ff4144",
        padding: 12,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14, lineHeight: "20px", color: "#fff", maxWidth: 250 }}>
          {title}
        </span>
        <span
          data-name="Alert tag"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: 12,
            lineHeight: "18px",
            color: "#ff4144",
            background: "rgba(255,65,68,0.1)",
            padding: "2px 12px",
            borderRadius: 4,
            letterSpacing: "-0.36px",
            fontFeatureSettings: '"lnum", "tnum"',
          }}
        >
          CRITICAL
        </span>
      </div>
      <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,0.5)" }}>
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
        height: 34,
        borderRadius: 12,
        border: "1px solid rgba(255,65,68,0.2)",
        background: "rgba(227,231,234,0.05)",
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 12, lineHeight: "18px" }}>
        <span style={{ color: "#fff" }}>+3 </span>
        <span style={{ color: "rgba(255,255,255,0.6)" }}>more critical signals</span>
      </span>
      <div style={{ width: 18, height: 18, transform: "rotate(180deg)", flexShrink: 0 }}>
        <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 10.4975 4.50012">
          <path d={svgPaths.p23a1f780} fill="white" fillOpacity="0.5" />
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
        borderRadius: 12,
        position: "relative",
        background: "#131519",
        border: "1px solid #ff4144",
        boxShadow: "inset 0px 0px 40px rgba(255,118,118,0.6)",
        fontFamily: "Poppins, sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{SCROLL_CSS}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <CriticalIcon />
          <span style={{ fontWeight: 700, fontSize: 16, lineHeight: "20px", color: "#fff" }}>Critical Signal</span>
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

/** Rendered above Brain widget (z-index 250) so Critical Signal covers the launcher icon. */
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
      onClick={(e) => { if ((e.target as HTMLElement).closest('[data-name="close"]')) onClose(); }}
    >
      <AlertWindowPanel expanded={expanded} onExpand={() => setExpanded(true)} />
    </div>
  );
}
