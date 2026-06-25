import { useEffect, useRef, useState } from "react";
import mascotImg from "../../imports/img-3.png";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onViewFullAnalysis: () => void;
  scale?: number;
}

const PINK = "#FF41A3";

const CHART_CSS = `
  .bb-dot { opacity:0; transform-box:fill-box; transform-origin:center; transform:scale(0); }
  .bb-popup.bb-play .bb-dot { animation: bb-pop .32s cubic-bezier(.34,1.56,.64,1) var(--d,0s) forwards; }
  @keyframes bb-pop { to { opacity:1; transform:scale(1); } }
  .bb-glow { transform-box:fill-box; transform-origin:center; opacity:0; }
  .bb-popup.bb-play .bb-glow { animation: bb-glowIn .4s ease 1.7s forwards, bb-pulse 1.8s ease-in-out 2.1s infinite; }
  @keyframes bb-glowIn { to { opacity:1; } }
  @keyframes bb-pulse { 0%,100%{opacity:.55;transform:scale(1);}50%{opacity:1;transform:scale(1.35);} }
`;

export function BrainBriefModal({ isOpen, onClose, onViewFullAnalysis, scale = 1 }: Props) {
  const [play, setPlay]   = useState(false);
  const sweepAnimRef      = useRef<SVGAnimateElement | null>(null);
  const sweepRectRef      = useRef<SVGRectElement | null>(null);

  useEffect(() => {
    if (!isOpen) { setPlay(false); return; }
    const t = setTimeout(() => {
      setPlay(true);
      if (sweepRectRef.current) sweepRectRef.current.setAttribute("width", "0");
      try { sweepAnimRef.current?.beginElement(); } catch (_) {
        sweepRectRef.current?.setAttribute("width", "245");
      }
    }, 380);
    return () => clearTimeout(t);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => { e.stopPropagation(); if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", zIndex: 60, pointerEvents: "auto" }}
    >
      <style>{CHART_CSS}</style>

      {/* Popup: 870px wide — height fits content */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className={`bb-popup${play ? " bb-play" : ""}`}
        style={{ width: 870, background: "#040802", border: "1px solid rgba(255,255,255,.2)", borderRadius: 4, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden", fontFamily: "Poppins, sans-serif", WebkitFontSmoothing: "antialiased", flexShrink: 0, transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 16, lineHeight: "18px", color: "rgba(255,255,255,.8)" }}>Today&apos;s Trade DNA Brief</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.6" stroke="rgba(255,255,255,.55)" strokeWidth="1.2"/>
              <circle cx="8" cy="5.1" r=".85" fill="rgba(255,255,255,.7)"/>
              <rect x="7.35" y="6.9" width="1.3" height="4.2" rx=".65" fill="rgba(255,255,255,.7)"/>
            </svg>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 8, background: "none", border: "none", cursor: "pointer" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.4 2.4L11.6 11.6M11.6 2.4L2.4 11.6" stroke="rgba(255,255,255,.7)" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "8px 20px 20px" }}>

          {/* ── Left card (400px) ── */}
          <div style={{ background: "rgba(227,231,234,.05)", borderRadius: 4, padding: 16, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", flexShrink: 0, width: 400 }}>
            {/* Greeting */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, fontSize: 14, lineHeight: "20px", whiteSpace: "nowrap", background: "linear-gradient(90deg,#e1daff 0%,#76bab2 61.6%,#e3ff94 134.25%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Good morning!</span>
                <span style={{ fontWeight: 500, fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>2026/06/16 07:00</span>
              </div>
              <div style={{ fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,.8)" }}>
                Your recent trades show rising emotional pressure, larger risk exposure, and weaker discipline after losses.
              </div>
            </div>

            {/* Chart box */}
            <div style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: 4, padding: 12, display: "flex", gap: 24, alignItems: "center" }}>
              {/* Mascot */}
              <img src={mascotImg} alt="Brain mascot" style={{ width: 84, height: 114, objectFit: "contain", flexShrink: 0 }} />
              {/* Chart */}
              <div style={{ display: "flex", flexDirection: "column", width: 236 }}>
                <span style={{ fontWeight: 500, fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,.5)" }}>Emotional Trading Trend</span>
                <span style={{ fontWeight: 600, fontSize: 12, lineHeight: "18px", color: PINK }}>Risk Increasing ▲</span>
                <div style={{ position: "relative", width: 236, height: 100 }}>
                  <svg style={{ position: "absolute", top: 0, left: 0, width: 236, height: 80, overflow: "visible" }} viewBox="0 0 236 80" fill="none">
                    <defs>
                      <linearGradient id="bb-areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor={PINK} stopOpacity=".35"/>
                        <stop offset="100%" stopColor={PINK} stopOpacity=".02"/>
                      </linearGradient>
                      <clipPath id="bb-sweep">
                        <rect id="bb-sweepRect" ref={sweepRectRef} x="0" y="-10" width="0" height="100">
                          <animate
                            ref={sweepAnimRef}
                            attributeName="width"
                            from="0" to="245"
                            dur="1.8s"
                            begin="indefinite"
                            fill="freeze"
                            calcMode="spline"
                            keyTimes="0;1"
                            keySplines="0.42 0 0.2 1"
                          />
                        </rect>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#bb-sweep)">
                      <path d="M14 62 L54 55 L93 48 L131 42 L164 36 L199 30 L223 24 L223 80 L14 80 Z" fill="url(#bb-areaGrad)"/>
                      <path d="M14 62 L54 55 L93 48 L131 42 L164 36 L199 30 L223 24" fill="none" stroke={PINK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <ellipse className="bb-glow" cx="223" cy="24" rx="9" ry="9" fill={PINK}/>
                    <circle className="bb-dot" cx="14"  cy="62" r="3" fill="#000" stroke={PINK} strokeWidth="1.2" style={{"--d": ".30s"} as React.CSSProperties}/>
                    <circle className="bb-dot" cx="54"  cy="55" r="3" fill="#000" stroke={PINK} strokeWidth="1.2" style={{"--d": ".60s"} as React.CSSProperties}/>
                    <circle className="bb-dot" cx="93"  cy="48" r="3" fill="#000" stroke={PINK} strokeWidth="1.2" style={{"--d": ".90s"} as React.CSSProperties}/>
                    <circle className="bb-dot" cx="131" cy="42" r="3" fill="#000" stroke={PINK} strokeWidth="1.2" style={{"--d": "1.15s"} as React.CSSProperties}/>
                    <circle className="bb-dot" cx="164" cy="36" r="3" fill="#000" stroke={PINK} strokeWidth="1.2" style={{"--d": "1.40s"} as React.CSSProperties}/>
                    <circle className="bb-dot" cx="199" cy="30" r="3" fill="#000" stroke={PINK} strokeWidth="1.2" style={{"--d": "1.65s"} as React.CSSProperties}/>
                    <circle className="bb-dot" cx="223" cy="24" r="3" fill={PINK} stroke={PINK} strokeWidth="1.2" style={{"--d": "1.84s"} as React.CSSProperties}/>
                  </svg>
                  <div style={{ position: "absolute", bottom: 15, left: 0, width: 236, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,.5)" }}>7 days ago</span>
                    <span style={{ fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,.5)" }}>Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right section ── */}
          <div style={{ display: "flex", flex: 1, minWidth: 0, flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Stats row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <StatItem label="Emotional State">
                  <span style={{ alignSelf: "flex-start", background: "#330D21", color: PINK, fontWeight: 600, fontSize: 13, lineHeight: "18px", padding: "2px 8px", borderRadius: 8 }}>Critical</span>
                </StatItem>
                <Divider />
                <StatItem label="Health Score">
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: 14, lineHeight: "20px", color: "rgba(255,255,255,.8)" }}>46</span>
                    <span style={{ border: `1px solid ${PINK}`, color: PINK, fontWeight: 600, fontSize: 13, lineHeight: "20px", padding: "1px 6px", borderRadius: 8, display: "flex", alignItems: "center" }}>High Risk</span>
                  </div>
                </StatItem>
                <Divider />
                <StatItem label="Win Rate">
                  <span style={{ fontWeight: 600, fontSize: 14, lineHeight: "20px", color: "rgba(255,255,255,.8)", whiteSpace: "nowrap" }}>38%</span>
                </StatItem>
                <Divider />
                <StatItem label="Market Regime">
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <div style={{ width: 4, height: 4, background: PINK, flexShrink: 0 }}/>
                    <span style={{ fontWeight: 600, fontSize: 13, lineHeight: "20px", color: "rgba(255,255,255,.8)" }}>Shock</span>
                  </div>
                </StatItem>
              </div>

              {/* Reminders */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                <span style={{ fontWeight: 700, fontSize: 14, lineHeight: "18px", color: "rgba(255,255,255,.8)" }}>Today&apos;s Reminders</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Notif num="01" keyFocus>
                    Don&apos;t rush into another trade after a loss. Pause and reassess first.
                  </Notif>
                  <Notif num="02">
                    Reduce position size and define a stop-loss before entering.
                  </Notif>
                </div>
              </div>
            </div>

            <span style={{ fontWeight: 500, fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,.5)", marginTop: 4 }}>Based on your trading behavior over the past 7 days</span>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 8, width: "100%", marginTop: 12 }}>
              <button
                type="button"
                onClick={onClose}
                style={{ flex: 1, height: 32, borderRadius: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px", fontWeight: 600, fontSize: 11, lineHeight: "20px", cursor: "pointer", border: "none", background: "linear-gradient(90deg,#7053f3 0%,#76bab2 45%,#e3ff94 98%)", color: "rgba(255,255,255,.9)", fontFamily: "inherit" }}
              >Got it</button>
              <button
                type="button"
                onClick={onViewFullAnalysis}
                style={{ flex: 1, height: 32, borderRadius: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px", fontWeight: 600, fontSize: 11, lineHeight: "20px", cursor: "pointer", background: "none", border: "1.2px solid rgba(255,255,255,.3)", color: "rgba(255,255,255,.6)", fontFamily: "inherit" }}
              >View Full Analysis</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontWeight: 500, fontSize: 12, lineHeight: "20px", color: "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>{label}</span>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 36.5, flexShrink: 0, background: "linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.18) 50%,rgba(255,255,255,0) 100%)" }} />;
}

function Notif({ num, children, keyFocus }: { num: string; children: string; keyFocus?: boolean }) {
  return (
    <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 4, padding: 12, width: "100%" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ width: 22, display: "flex", justifyContent: "center", color: PINK, fontWeight: 500, fontSize: 14, lineHeight: "18px", flexShrink: 0 }}>{num}</div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {keyFocus && (
            <span style={{ alignSelf: "flex-start", border: "1px solid rgba(255,255,255,.25)", borderRadius: 4, padding: "1px 6px", fontWeight: 500, fontSize: 11, lineHeight: "16px", color: "rgba(255,255,255,.55)" }}>Key Focus</span>
          )}
          <div style={{ fontWeight: 600, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,.8)" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
