import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import Lottie from "lottie-react";
import { QuickStartOverlay } from "./quick-start-overlay";

// Lottie JSON animations
import bgAnimation from "../../imports/bg.json";
import brainAnimation from "../../imports/Brain.json";
import iconAnimation from "../../imports/icon.json";
import svgPaths from "../../imports/UploadFilesImageUploadStateEmpty-1/svg-d2kerqg99v";
import sendIcon from "../../imports/send.svg";

export type BrainWidgetProps = {
  initialName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  scale?: number;
};

const DESIGN_W = 1920;
const DESIGN_H = 1080;
const BRAIN_W = 375;
const BRAIN_H = 830;
const BRAIN_MARGIN = 48;
const LAUNCHER_SIZE = 58;
type Screen = "home" | "conversation" | "history";
type Overlay = "none" | "settings" | "rename" | "rename-success" | "quick-start" | "delete";
type ProcessPhase = "idle" | "planning" | "market" | "executing" | "complete";
type HistoryItem = { id: string; group: string; title: string; date: string; description: string; active?: boolean };
type AttachmentKind = "image" | "document";
type Attachment =
  | { name: string; kind: "document" }
  | { name: string; kind: "image"; previewUrl: string };

function getAttachmentKind(file: File): AttachmentKind {
  return file.type.startsWith("image/") ? "image" : "document";
}

function createAttachment(file: File): Attachment {
  if (getAttachmentKind(file) === "image") {
    return { name: file.name, kind: "image", previewUrl: URL.createObjectURL(file) };
  }
  return { name: file.name, kind: "document" };
}

function revokeAttachmentPreview(attachment: Attachment | null) {
  if (attachment?.kind === "image") {
    URL.revokeObjectURL(attachment.previewUrl);
  }
}


const initialHistory: HistoryItem[] = [
  { id: "btc-long", group: "Today", title: "I want to long BTC with 20U", date: "May 22, 16:00", description: "You plan to open a 20 USDT BTC long position.", active: true },
  { id: "eth-breakout", group: "Today", title: "ETH Breakout Analysis", date: "May 22 · 14:18", description: "ETH breakout levels and invalidation." },
  { id: "portfolio-review", group: "Yesterday", title: "Portfolio Emotional Review", date: "May 21 · 09:12", description: "Reviewing recent emotional trading patterns." },
  { id: "market-thesis", group: "Yesterday", title: "Market Thesis - ETH", date: "May 21 · 20:44", description: "ETH directional thesis and key levels." },
  { id: "sol-risk", group: "Yesterday", title: "SOL Risk Review", date: "May 21 · 21:17", description: "Assessing SOL volatility and downside." },
  { id: "journal-btc", group: "May 20", title: "Trade Journal - BTC", date: "May 20 · 10:15", description: "BTC trade journal notes and review." },
];

const searchItems: HistoryItem[] = [
  { id: "btc-long-result", group: "", title: "I want to long BTC with 20U", date: "May 22", description: "You plan to open a 20 USDT BTC long position." },
  { id: "btc-today", group: "", title: "Should I Long BTC Today?", date: "May 22", description: "BTC market conditions and leverage risks." },
  { id: "trade-plan", group: "", title: "Trade Plan Analysis", date: "May 21", description: "Generating a personalized BTC trading plan." },
  { id: "position-strategy", group: "", title: "Position Strategy", date: "May 20", description: "Building a personalized BTC trading plan." },
  { id: "risk-assessment", group: "", title: "Risk Assessment", date: "May 19", description: "BTC volatility and potential downside." },
];

const completeCopy = [
  "Analysis Results",
  "Multiple emotional trading signals have been detected.",
  "You plan to open a 20 USDT BTC long position. Based on your recent trading behavior, this trade appears to be driven more by emotion than by a well-defined trading strategy.",
  "Key Insights",
  "Trading Recommendation: Consider staying on the sidelines and waiting for a stronger entry opportunity.",
  "Market Condition: BTC momentum is currently weakening.",
];

// ─── Shared UI atoms ──────────────────────────────────────────────────────────

function HoverButton({ children, onClick, ariaLabel, disabled, style }: { children: ReactNode; onClick?: () => void; ariaLabel?: string; disabled?: boolean; style?: CSSProperties }) {
  const [active, setActive] = useState(false);
  return (
    <button type="button" aria-label={ariaLabel} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)} onBlur={() => setActive(false)}
      style={{ border: 0, fontFamily: "inherit", cursor: disabled ? "default" : "pointer", color: active ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.6)", background: active ? "rgba(255,255,255,.08)" : "transparent", transition: "color 160ms ease, background-color 160ms ease", outline: "none", ...style }}>
      {children}
    </button>
  );
}

function XIcon() { return <span aria-hidden="true" style={{ fontSize: 25, lineHeight: 1, fontWeight: 300 }}>×</span>; }
function Chevron({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path d={direction === "right" ? "M6 3.5 10.5 8 6 12.5" : "M10 3.5 5.5 8l4.5 4.5"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Check() {
  return <span style={{ width: 17, height: 17, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#00e7ad", color: "#07120f", fontSize: 12, fontWeight: 800 }}>✓</span>;
}

function SearchIcon() {
  return <img src="/search.svg" alt="" aria-hidden="true" width={16} height={16} style={{ display: "block", flexShrink: 0 }} />;
}

function DeleteIcon() {
  return <img src="/delete.svg" alt="" aria-hidden="true" width={15} height={15} style={{ display: "block", flexShrink: 0 }} />;
}

function ShimmerStyle() {
  return (
    <style>{`
      @keyframes brainHistoryShimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  );
}

function SkeletonBar({ width, delay = 0 }: { width: string; delay?: number }) {
  return (
    <div style={{ width, height: 13, borderRadius: 999, overflow: "hidden", background: "rgba(255,255,255,0.1)", position: "relative", flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.24) 45%, rgba(255,255,255,0.08) 55%, transparent 100%)",
          animation: `brainHistoryShimmer 1.35s ease-in-out ${delay}s infinite`,
        }}
      />
    </div>
  );
}

function SearchLoadingSkeleton() {
  return (
    <>
      <ShimmerStyle />
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 72,
            borderRadius: 10,
            marginBottom: 8,
            padding: "14px 16px",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <SkeletonBar width="58%" delay={i * 0.15} />
          <SkeletonBar width="42%" delay={i * 0.15 + 0.08} />
        </div>
      ))}
    </>
  );
}

// ─── Figma TopBar (SupportNav) ────────────────────────────────────────────────

function TopBar({ title, onNewChat, onSettings, onClose, onBack }: { title: string; onNewChat: () => void; onSettings: () => void; onClose: () => void; onBack?: () => void }) {
  return (
    <header style={{ width: "100%", height: 58, padding: "16px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: onBack ? 4 : 0, minWidth: 0 }}>
        {onBack && (
          <HoverButton ariaLabel="Back" onClick={onBack} style={{ width: 18, height: 32, borderRadius: 8, padding: 0, display: "grid", placeItems: "center" }}>
            <img src="/Container.svg" alt="" aria-hidden="true" width={18} height={32} style={{ display: "block" }} />
          </HoverButton>
        )}
        <div style={{ color: "#fff", fontSize: onBack ? 13 : 16, lineHeight: "20px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* OpenInNew icon */}
          <HoverButton ariaLabel="New chat" onClick={onNewChat} style={{ width: 24, height: 24, borderRadius: 999, padding: 0, display: "grid", placeItems: "center" }}>
            <div style={{ position: "relative", width: 24, height: 24, overflow: "hidden", borderRadius: 999 }}>
              <div style={{ position: "absolute", inset: "16.67%" }}>
                <div style={{ position: "absolute", inset: "-4.69%" }}>
                  <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 17.5 17.5">
                    <path d={svgPaths.p2b058218} stroke="white" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p2ce46c80} stroke="white" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </HoverButton>
          {/* Settings icon */}
          <HoverButton ariaLabel="Settings" onClick={onSettings} style={{ width: 24, height: 24, borderRadius: 999, padding: 0, display: "grid", placeItems: "center" }}>
            <div style={{ position: "relative", width: 24, height: 24, overflow: "hidden", borderRadius: 999 }}>
              <div style={{ position: "absolute", inset: "16.67% 18.33% 16.67% 16.67%" }}>
                <div style={{ position: "absolute", inset: "-4.69% -4.81%" }}>
                  <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 17.1 17.5">
                    <path d={svgPaths.p2a62fb00} stroke="white" strokeOpacity="0.6" strokeLinecap="round" strokeWidth="1.5" />
                    <path d={svgPaths.p675500} stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </HoverButton>
        </div>
        {/* Close icon */}
        <HoverButton ariaLabel="Close Brain" onClick={onClose} style={{ width: 20, height: 20, borderRadius: 999, padding: 0, display: "grid", placeItems: "center" }}>
          <div style={{ position: "relative", width: 20, height: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: "16.27% 16.64% 17.01% 16.6%" }}>
              <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 13.352 13.343">
                <path d={svgPaths.pf799e00} fill="white" fillOpacity="0.9" />
              </svg>
            </div>
          </div>
        </HoverButton>
      </div>
    </header>
  );
}

// ─── Figma Home Screen ────────────────────────────────────────────────────────


function HomeMainSection({ brainName, onGetStarted, onWhatsHappening, onChatWithBrain }: { brainName: string; onGetStarted: () => void; onWhatsHappening: () => void; onChatWithBrain: () => void }) {
  return (
    <div style={{ flex: "1 0 0", minHeight: 0, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px" }}>
      {/* Hero */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", paddingTop: 28, width: "100%", flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", textAlign: "center" }}>
          <p style={{ margin: 0, background: "linear-gradient(90deg, #dbd3ff 0%, #76bab2 66.625%, #e3ff94 145.09%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 18, lineHeight: "28px", whiteSpace: "nowrap" }}>Let's build your trading edge</p>
          <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 14, lineHeight: "18px", color: "rgba(255,255,255,0.7)" }}>Tell me how you trade.</p>
        </div>
        <button type="button" onClick={onGetStarted} style={{ background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 12px", borderRadius: 99, border: 0, cursor: "pointer" }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 12, lineHeight: "18px", color: "#121419", whiteSpace: "nowrap" }}>Get Started</span>
        </button>
      </div>

      {/* Main animation section */}
      <div style={{ flex: "1 0 0", minHeight: 0, position: "relative", width: 343, overflow: "hidden" }}>

        {/* bg.json — background layer */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lottie animationData={bgAnimation} loop autoplay style={{ width: "100%", height: "100%" }} />
        </div>
        {/* Brain.json — foreground layer */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lottie animationData={brainAnimation} loop autoplay style={{ width: "100%", height: "100%" }} />
        </div>

        {/* "Hi, I'm Brain" info section */}
        <div
          style={{ position: "absolute", top: 325, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2px 8px", fontSize: 12, lineHeight: "18px", textAlign: "center", whiteSpace: "nowrap", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 184 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23higrad)' opacity='1'/><defs><radialGradient id='higrad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(9.2 0 0 2 92 20)'><stop stop-color='rgba(18,20,25,1)' offset='0'/><stop stop-color='rgba(18,20,25,0)' offset='1'/></radialGradient></defs></svg>\")" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#fff" }}>Hi, I'm</span>
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, background: "linear-gradient(90deg,#dbd3ff 0%,#76bab2 66.625%,#e3ff94 145.09%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{brainName}</span>
          </div>
          <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>Your AI Trading Companion</p>
        </div>

        <style>{`
          @keyframes float-up-down {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          @keyframes float-up-down-offset {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
        `}</style>

        {/* "What's happening today?" — fill tag */}
        <button type="button" onClick={onWhatsHappening}
          style={{ position: "absolute", left: 29, top: 70, background: "linear-gradient(90deg,#c6a4ff,#dbfd5c)", display: "flex", alignItems: "center", padding: "4px 10px", borderRadius: 8, border: 0, cursor: "pointer", overflow: "hidden", animation: "float-up-down 4s ease-in-out infinite" }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 12, color: "#000", whiteSpace: "nowrap" }}>What's happening today?</span>
        </button>

        {/* "Chat with Brain ↗" — outline tag */}
        <button type="button" onClick={onChatWithBrain}
          style={{ position: "absolute", left: 154, top: 402, background: "#000", display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, border: "1px solid #dbfd5c", cursor: "pointer", overflow: "hidden", animation: "float-up-down-offset 4.8s ease-in-out infinite 1.2s" }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 12, color: "#dbfd5c", whiteSpace: "nowrap" }}>Chat with {brainName}</span>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: "rotate(180deg)", width: 15, height: 14 }}>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d={svgPaths.p3ee20880} stroke="#DBFD5C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p627b4e0} stroke="#DBFD5C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Figma Input Box (BottonNavBar default) ───────────────────────────────────

function AttachmentRemoveButton({ onRemove }: { onRemove: () => void }) {
  return (
    <button
      type="button"
      aria-label="Remove attachment"
      onClick={onRemove}
      style={{
        position: "absolute",
        right: 7,
        top: 6,
        width: 12,
        height: 12,
        border: 0,
        padding: 0,
        borderRadius: 999,
        background: "#15171B",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden="true" style={{ display: "block" }}>
        <path d="M1.05 1.05L4.95 4.95M4.95 1.05L1.05 4.95" stroke="white" strokeOpacity="0.8" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function AttachmentPreview({ attachment, onRemove }: { attachment: Attachment; onRemove: () => void }) {
  const removeOverlay = (
    <button
      type="button"
      aria-label="Remove attachment"
      onClick={onRemove}
      style={{
        position: "absolute",
        right: 6,
        top: 6,
        width: 12,
        height: 12,
        border: 0,
        padding: 0,
        background: "transparent",
        cursor: "pointer",
      }}
    />
  );

  if (attachment.kind === "image") {
    return (
      <div style={{ position: "relative", width: 48, height: 48, marginBottom: 8, flexShrink: 0, alignSelf: "flex-start" }}>
        <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
          <img
            src={attachment.previewUrl}
            alt={attachment.name}
            width={48}
            height={48}
            style={{ display: "block", width: 48, height: 48, objectFit: "cover" }}
          />
        </div>
        <AttachmentRemoveButton onRemove={onRemove} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: 137, height: 38, marginBottom: 8, flexShrink: 0, alignSelf: "flex-start" }}>
      <img
        src="/file.svg"
        alt=""
        width={137}
        height={38}
        style={{ display: "block", width: 137, height: 38 }}
      />
      {removeOverlay}
    </div>
  );
}

function InputBox({ value, onChange, onSend, inputRef, attachment, onAttach, onRemoveAttachment }: { value: string; onChange: (v: string) => void; onSend: () => void; inputRef: RefObject<HTMLTextAreaElement | null>; attachment: Attachment | null; onAttach: (f: File | null) => void; onRemoveAttachment: () => void }) {
  const [focused, setFocused] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const active = focused || Boolean(value.trim()) || Boolean(attachment);
  const isInput = active;

  const handleFileChange = (file: File | null) => {
    onAttach(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div style={{ flex: "0 0 auto", width: "100%", padding: "0 12px 16px" }}>
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          minHeight: 131,
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 351 131' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.05 25.1 -32.666 -5.2708 66 -163)'><stop stop-color='rgba(255,255,255,0.22)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>"), linear-gradient(90deg, rgb(18, 20, 24) 0%, rgb(18, 20, 24) 100%)`,
          ...(isInput ? { filter: "drop-shadow(0px 0px 5.6px rgba(221,200,255,0.6))" } : {}),
        }}
      >
        {/* Border */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 16, border: `1.2px solid ${isInput ? "#7053f3" : "#c7bcfa"}`, pointerEvents: "none" }} />

        <div style={{ padding: "13px 17px 11px", display: "flex", flexDirection: "column", height: "100%", minHeight: 131 }}>
          {attachment ? <AttachmentPreview attachment={attachment} onRemove={onRemoveAttachment} /> : null}
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
            placeholder="Tell me about your trading habits..."
            rows={2}
            style={{ flex: 1, resize: "none", border: 0, outline: 0, background: "transparent", fontFamily: "Poppins, sans-serif", fontWeight: isInput ? 500 : 600, fontSize: 13, lineHeight: "18px", color: isInput ? "#fff" : "rgba(255,255,255,0.3)", whiteSpace: "nowrap", overflow: "hidden" }}
          />
          {/* Function row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            {/* Add button */}
            <button type="button" aria-label="Attach file" onClick={() => fileRef.current?.click()}
              style={{ width: 20, height: 20, borderRadius: 999, border: 0, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
              <div style={{ width: 16, height: 16, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", inset: "12.21% 12.54% 12.79% 12.46%" }}>
                  <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 12 12">
                    <path d={svgPaths.p31ff1000} fill="white" fillOpacity="0.8" />
                  </svg>
                </div>
              </div>
            </button>
            <input ref={fileRef} type="file" hidden accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
            {/* Send button */}
            <button type="button" aria-label="Send" onClick={onSend}
              style={{ width: 24, height: 24, border: 0, padding: 0, background: "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={sendIcon} alt="Send" width={24} height={24} style={{ display: "block", flexShrink: 0 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Process / Conversation ───────────────────────────────────────────────────

// ─── Conversation screen Figma-matched components ────────────────────────────

const SPINNER_BG = "M5.70483 13.3358C5.37875 13.7651 4.75979 13.8533 4.38478 13.466C3.67653 12.7345 3.14896 11.8415 2.8515 10.858C2.45936 9.56141 2.48721 8.17406 2.93107 6.89429C3.37493 5.61452 4.21208 4.50786 5.32281 3.73254C6.43353 2.95723 7.76096 2.55296 9.1153 2.57755C10.4696 2.60214 11.7815 3.05432 12.8634 3.86943C13.9452 4.68455 14.7417 5.82087 15.1388 7.1159C15.5359 8.41094 15.5134 9.79839 15.0744 11.0799C14.7415 12.0519 14.1818 12.9252 13.4475 13.6305C13.0587 14.004 12.4433 13.8933 12.133 13.4525C11.8228 13.0116 11.9389 12.4084 12.3021 12.0099C12.7119 11.5603 13.0281 11.0292 13.2274 10.4472C13.5329 9.55529 13.5486 8.58963 13.2722 7.68828C12.9958 6.78694 12.4415 5.99606 11.6885 5.42874C10.9355 4.86142 10.0225 4.5467 9.07986 4.52959C8.13724 4.51248 7.21335 4.79385 6.44029 5.33346C5.66722 5.87308 5.08457 6.64332 4.77564 7.53404C4.46671 8.42476 4.44733 9.39035 4.72026 10.2928C4.89836 10.8816 5.19498 11.4239 5.58822 11.8881C5.93671 12.2994 6.03091 12.9064 5.70483 13.3358Z";
const SPINNER_ARC = "M14.4457 9.00068C14.9848 9.00068 15.4295 9.44022 15.3478 9.97313C15.1937 10.9796 14.8016 11.9399 14.1982 12.7716C13.4029 13.8681 12.2812 14.685 10.9936 15.1055C9.70599 15.5261 8.31837 15.5288 7.02915 15.1131C5.73993 14.6975 4.61513 13.8849 3.81557 12.7915C3.01602 11.6981 2.58266 10.3799 2.57746 9.02534C2.57226 7.6708 2.99548 6.34929 3.78661 5.24977C4.57774 4.15025 5.69626 3.32903 6.98225 2.90353C7.95774 2.58076 8.9917 2.49823 9.99752 2.65643C10.5301 2.7402 10.8142 3.29717 10.6507 3.81092C10.4873 4.32468 9.93667 4.59698 9.3997 4.54873C8.79378 4.49429 8.1796 4.56381 7.59554 4.75706C6.70049 5.05321 5.922 5.62478 5.37137 6.39004C4.82074 7.15531 4.52618 8.07508 4.5298 9.01785C4.53343 9.96061 4.83504 10.8781 5.39153 11.6391C5.94802 12.4001 6.73088 12.9657 7.62818 13.255C8.52548 13.5442 9.49127 13.5424 10.3874 13.2497C11.2836 12.9569 12.0643 12.3884 12.6179 11.6252C12.9791 11.1272 13.2315 10.563 13.3634 9.96913C13.4802 9.44281 13.9066 9.00068 14.4457 9.00068Z";
const CIRCLE_CHECK = "M0 5C0 2.2385 2.2385 0 5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10C2.2385 10 0 7.7615 0 5ZM7.4855 2.6565C7.599 2.548 7.755 2.5005 7.904 2.5005C8.053 2.5005 8.209 2.548 8.322 2.6565C8.37596 2.70796 8.41891 2.76983 8.44826 2.83837C8.47761 2.90691 8.49274 2.98069 8.49274 3.05525C8.49274 3.12981 8.47761 3.20359 8.44826 3.27213C8.41891 3.34067 8.37596 3.40254 8.322 3.454L4.247 7.338C4.13274 7.44242 3.98354 7.50032 3.82875 7.50032C3.67396 7.50032 3.52477 7.44242 3.4105 7.338L1.6635 5.673C1.60975 5.62148 1.56697 5.55961 1.53775 5.49113C1.50853 5.42264 1.49347 5.34896 1.49347 5.2745C1.49347 5.20004 1.50853 5.12636 1.53775 5.05787C1.56697 4.98939 1.60975 4.92752 1.6635 4.876C1.77779 4.77144 1.92709 4.71345 2.082 4.71345C2.23691 4.71345 2.38621 4.77144 2.5005 4.876L3.8285 6.1415L7.4855 2.6565Z";

function Spinner() {
  return (
    <div style={{ width: 18, height: 18, flexShrink: 0, animation: "spin-cw 1s linear infinite" }}>
      <style>{`@keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 17.9975 17.9975">
        <mask fill="white" id="sp-bg"><path d={SPINNER_BG} /></mask>
        <path d={SPINNER_BG} mask="url(#sp-bg)" stroke="#3A3A3A" strokeWidth="4" />
        <mask fill="white" id="sp-arc"><path d={SPINNER_ARC} /></mask>
        <path d={SPINNER_ARC} mask="url(#sp-arc)" stroke="url(#sp-grad)" strokeWidth="4" />
        <defs>
          <linearGradient id="sp-grad" gradientUnits="userSpaceOnUse" x1="8.99965" x2="13.5032" y1="2.57844" y2="19.0003">
            <stop stopColor="#B78AFF" />
            <stop offset="0.176341" stopColor="#C49FFF" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function CircleCheck() {
  return (
    <div style={{ width: 12, height: 12, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: "8.33% 8.28% 8.34% 8.39%" }}>
        <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 10 10">
          <path clipRule="evenodd" d={CIRCLE_CHECK} fill="#00FFAB" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function ChevronRight({ opacity = 0.3 }: { opacity?: number }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: "block" }}>
      <path d="M8 2L4 6L8 10" stroke="white" strokeOpacity={opacity} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  );
}

function ThinkingBubble({ name }: { name: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "10px 8px", flexShrink: 0 }}>
      <Spinner />
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.8)", textShadow: "0px 0px 4px rgba(0,0,0,0.4)" }}>{name} is thinking...</span>
    </div>
  );
}

function GradNum({ n }: { n: string }) {
  return (
    <div style={{ width: 18, flexShrink: 0, background: "linear-gradient(90deg,#d9d0ff,#ffffff 62.694%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px" }}>{n}</div>
  );
}

function PlanningStepsCard({ steps, phaseSteps, label }: { steps: string[]; phaseSteps: number; label: string }) {
  const visible = steps.slice(0, Math.max(phaseSteps, 1));
  return (
    <div style={{ background: "#1a1b1f", borderRadius: 8, padding: 8, flexShrink: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: visible.length ? 8 : 0 }}>
        <span style={{ background: "linear-gradient(90deg,#d9d0ff,#85d7cd 62.694%,#e3ff94 109.18%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-90deg)" }}>
          <ChevronRight />
        </div>
      </div>
      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {visible.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 4, opacity: i === 0 ? 0.8 : i === 1 ? 0.5 : 0.3, flexShrink: 0 }}>
            <GradNum n={`0${i + 1}`} />
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.57)", whiteSpace: "nowrap" }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollapsedProcessCard({ label }: { label: string }) {
  return (
    <div style={{ background: "#1a1b1f", borderRadius: 8, padding: 8, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.8)" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <CircleCheck />
          <div style={{ transform: "rotate(180deg)" }}>
            <ChevronRight opacity={0.8} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightRow({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 4, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 2px", flexShrink: 0 }}>
        <div style={{ width: 4, height: 4, background: "#9e73e3", flexShrink: 0 }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.8)" }}>{title}</p>
        <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,0.6)" }}>{body}</p>
      </div>
    </div>
  );
}

function ActionRow({ label }: { label: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.5)" }}>{label}</span>
      <div style={{ transform: "rotate(180deg)" }}>
        <ChevronRight opacity={0.8} />
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.1)", width: "100%", flexShrink: 0 }} />;
}

function AnalysisResults() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", flexShrink: 0 }}>
      {/* Conclusion */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 8 }}>
        <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: "18px", color: "#e2cfff" }}>Analysis Results</p>
        <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.8)" }}>Multiple emotional trading signals have been detected.</p>
        <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.8)" }}>You plan to open a 20 USDT BTC long position. Based on your recent trading behavior, this trade appears to be driven more by emotion than by a well-defined trading strategy.</p>
      </div>
      <Divider />
      {/* Key Insights */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 8 }}>
        <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: "18px", color: "#e2cfff" }}>Key Insights</p>
        <InsightRow title="Trading Recommendation" body="Consider staying on the sidelines and waiting for a stronger entry opportunity." />
        <InsightRow title="Market Condition" body="BTC momentum is currently weakening." />
      </div>
      <Divider />
      {/* Next Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: 8 }}>
        <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>Next Steps</p>
        <ActionRow label="View Optimal Entry Zones" />
        <ActionRow label="Wait for Breakout Confirmation" />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 8px 8px" }}>
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,0.4)" }}>4:15 PM</span>
      </div>
    </div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export function BrainWidget({ initialName = "Brain", open, onOpenChange, scale = 1 }: BrainWidgetProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = onOpenChange !== undefined;
  const isOpen = isControlled ? (open ?? false) : internalOpen;
  const setIsOpen = (next: boolean) => {
    if (isControlled) onOpenChange(next);
    else setInternalOpen(next);
  };
  const [screen, setScreen] = useState<Screen>("home");
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [brainName, setBrainName] = useState(initialName);
  const [renameValue, setRenameValue] = useState("");
  const [pendingName, setPendingName] = useState("");
  const [message, setMessage] = useState("");
  const [lastSentMessage, setLastSentMessage] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [phase, setPhase] = useState<ProcessPhase>("idle");
  const [phaseSteps, setPhaseSteps] = useState(0);
  const [history, setHistory] = useState(initialHistory);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<HistoryItem | null>(null);
  const attachmentRef = useRef<Attachment | null>(null);
  const launcherIconRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    attachmentRef.current = attachment;
  }, [attachment]);

  useEffect(() => () => revokeAttachmentPreview(attachmentRef.current), []);

  const clearAttachment = () => {
    setAttachment((current) => {
      revokeAttachmentPreview(current);
      return null;
    });
  };

  const attachFile = (file: File | null) => {
    setAttachment((current) => {
      revokeAttachmentPreview(current);
      return file ? createAttachment(file) : null;
    });
  };

  useEffect(() => {
    const anim = launcherIconRef.current?.animate(
      [{ transform: "translateY(2px)" }, { transform: "translateY(-3px)" }, { transform: "translateY(2px)" }],
      { duration: 3600, iterations: Infinity, easing: "ease-in-out" }
    );
    return () => anim?.cancel();
  }, []);

  useEffect(() => {
    if (!query.trim()) { setSearching(false); return; }
    setSearching(true);
    const t = window.setTimeout(() => setSearching(false), 4000);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (phase === "idle" || phase === "complete") return;
    const ts: number[] = [];
    const later = (cb: () => void, d: number) => ts.push(window.setTimeout(cb, d));
    if (phase === "planning") {
      later(() => setPhaseSteps(1), 350); later(() => setPhaseSteps(2), 750); later(() => setPhaseSteps(3), 1150);
      later(() => { setPhase("market"); setPhaseSteps(0); }, 1650);
    } else if (phase === "market") {
      later(() => setPhaseSteps(1), 350); later(() => setPhaseSteps(2), 750); later(() => setPhaseSteps(3), 1150);
      later(() => { setPhase("executing"); setPhaseSteps(0); }, 1650);
    } else if (phase === "executing") {
      [1, 2, 3, 4, 5].forEach((s, i) => later(() => setPhaseSteps(s), 350 + i * 380));
      later(() => { setPhase("complete"); setPhaseSteps(0); }, 2450);
    }
    return () => ts.forEach(window.clearTimeout);
  }, [phase]);


  const groupedHistory = useMemo(() => {
    const groups = new Map<string, HistoryItem[]>();
    history.forEach((item) => groups.set(item.group, [...(groups.get(item.group) ?? []), item]));
    return [...groups.entries()];
  }, [history]);

  const reset = () => {
    setScreen("home");
    setOverlay("none");
    setMessage("");
    setLastSentMessage("");
    clearAttachment();
    setPhase("idle");
    setPhaseSteps(0);
    setQuery("");
  };
  const send = () => {
    if (!message.trim() && !attachment) return;
    setLastSentMessage(message.trim() || attachment?.name || "");
    setMessage("");
    clearAttachment();
    inputRef.current?.blur();
    setScreen("conversation");
    setOverlay("none");
    setPhase("planning");
    setPhaseSteps(0);
  };
  const showHistory = () => { setOverlay("none"); setScreen("history"); };
  const openRename = () => { setRenameValue(brainName === "Brain" ? "" : brainName); setOverlay("rename"); };

  const renameCount = Array.from(renameValue.trim()).length;
  const renameError = renameCount > 15;
  const searchResults = query.trim().toLowerCase() === "@123456" ? [] : searchItems.filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()) || query.trim().toLowerCase() === "btc"
  );

  const brainLeft = (DESIGN_W - BRAIN_MARGIN - BRAIN_W) * scale;
  const brainTop = (DESIGN_H - BRAIN_MARGIN - BRAIN_H) * scale;
  const launcherLeft = (DESIGN_W - BRAIN_MARGIN - LAUNCHER_SIZE) * scale;
  const launcherTop = (DESIGN_H - BRAIN_MARGIN - LAUNCHER_SIZE) * scale;

  return (
    <section aria-label="Brain trading companion" style={{ position: "relative", width: "100%", height: "100%", minHeight: 640, overflow: "visible", background: "transparent", fontFamily: "Poppins, sans-serif", pointerEvents: "none", zIndex: 200 }}>

      {/* Full-frame blocker — absorbs all pointer events so nothing reaches the page behind */}
      {isOpen && (
        <div
          aria-hidden="true"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          style={{ position: "absolute", inset: 0, zIndex: 199, pointerEvents: "auto" }}
        />
      )}

      {/* Launcher */}
      <button type="button" aria-label="Open Brain" onClick={() => setIsOpen(true)}
        style={{ position: "absolute", left: launcherLeft, top: launcherTop, width: LAUNCHER_SIZE, height: LAUNCHER_SIZE, transform: `scale(${scale})`, transformOrigin: "top left", border: 0, padding: 0, display: "grid", placeItems: "center", background: "transparent", cursor: "pointer", pointerEvents: "auto", opacity: isOpen ? 0 : 1, visibility: isOpen ? "hidden" : "visible", transition: "opacity 240ms ease, visibility 0s linear 340ms" }}>
        <div ref={launcherIconRef} aria-hidden="true" style={{ width: 54, height: 54, pointerEvents: "none" }}>
          <Lottie animationData={iconAnimation} loop autoplay style={{ width: "100%", height: "100%" }} />
        </div>
      </button>

      {/* Widget panel — 375×830 at 1920 design, scaled with frame */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", left: brainLeft, top: brainTop, width: BRAIN_W, height: BRAIN_H, transform: `scale(${scale})`, transformOrigin: "top left", borderRadius: 24, border: "1px solid rgba(226,208,255,.79)", overflow: "hidden", display: "flex", flexDirection: "column", color: "#fff", background: "#121419", boxShadow: "0 20px 60px rgba(0,0,0,.28)", opacity: isOpen ? 1 : 0, visibility: isOpen ? "visible" : "hidden", pointerEvents: isOpen ? "auto" : "none", zIndex: 200, transition: "opacity 280ms ease, visibility 0s linear 340ms" }}>

        <TopBar title={screen === "history" ? "Conversation History" : brainName} onNewChat={reset} onSettings={() => setOverlay("settings")} onClose={() => setIsOpen(false)} onBack={screen === "history" ? () => setScreen("home") : undefined} />

        {/* HOME */}
        {screen === "home" ? (
          <HomeMainSection
            brainName={brainName}
            onGetStarted={() => setOverlay("quick-start")}
            onWhatsHappening={() => { setMessage("What's happening today?"); inputRef.current?.focus(); }}
            onChatWithBrain={() => inputRef.current?.focus()}
          />
        ) : null}

        {/* CONVERSATION */}
        {screen === "conversation" ? (
          <main style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "8px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {/* User message bubble */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", paddingLeft: 40, width: "100%" }}>
                  <div style={{ background: "#2d2d2f", padding: "8px 12px", borderRadius: "16px 16px 2px 16px", maxWidth: 292 }}>
                    <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.9)" }}>{lastSentMessage}</p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,0.4)" }}>Just now</span>
              </div>
            </div>

            {/* Planning state */}
            {phase === "planning" && (
              <>
                <PlanningStepsCard
                  label="Planning..."
                  phaseSteps={phaseSteps}
                  steps={["Analyzing today's BTC market...", "Retrieving key cryptocurrency market data...", "Leverage condition analysis..."]}
                />
                <div style={{ paddingRight: 64 }}><ThinkingBubble name={brainName} /></div>
              </>
            )}

            {/* Market / Executing state */}
            {(phase === "market" || phase === "executing") && (
              <>
                <CollapsedProcessCard label="Plan" />
                <PlanningStepsCard
                  label="Market Analysis..."
                  phaseSteps={phase === "executing" ? 3 : phaseSteps}
                  steps={["Analyze Today's BTC Market", "Retrieving key cryptocurrency market data", "Leverage condition analysis"]}
                />
                <div style={{ paddingRight: 64 }}><ThinkingBubble name={brainName} /></div>
              </>
            )}

            {/* Complete state — collapsed cards + full results */}
            {phase === "complete" && (
              <>
                <CollapsedProcessCard label="Plan" />
                <CollapsedProcessCard label="Market Analysis" />
                <AnalysisResults />
              </>
            )}
          </main>
        ) : null}

        {/* HISTORY */}
        {screen === "history" ? (
          <main style={{ flex: 1, minHeight: 0, padding: "8px 16px 18px", overflowY: "auto" }}>
            <div style={{ height: 42, borderRadius: 10, border: query ? "1px solid rgba(255,255,255,.55)" : "1px solid transparent", background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 9, padding: "0 12px", marginBottom: 14 }}>
              <SearchIcon />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search conversations..." style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: "transparent", color: "rgba(255,255,255,.82)", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }} />
              {query ? <HoverButton ariaLabel="Clear search" onClick={() => setQuery("")} style={{ width: 24, height: 24, borderRadius: 999, padding: 0 }}><XIcon /></HoverButton> : null}
            </div>
            {query
              ? searching
                ? <SearchLoadingSkeleton />
                : searchResults.length ? searchResults.map((item) => <SearchCard key={item.id} item={item} />) : <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,.5)", fontSize: 14, fontWeight: 600 }}><SearchIcon />No results found</div>
              : groupedHistory.map(([group, items]) => (
                <section key={group} style={{ marginBottom: 14 }}>
                  <h2 style={{ margin: "0 0 8px", color: "rgba(255,255,255,.54)", fontSize: 14, lineHeight: "20px", fontWeight: 600 }}>{group}</h2>
                  {items.map((item) => (
                    <div key={item.id} style={{ position: "relative", minHeight: 74, borderRadius: 10, border: "1px solid rgba(255,255,255,.07)", marginBottom: 6, padding: "13px 52px 12px 13px", background: deleteMenu === item.id ? "rgba(255,255,255,.06)" : "transparent" }}>
                      <div style={{ color: "rgba(255,255,255,.8)", fontSize: 13, lineHeight: "18px", fontWeight: 600 }}>{item.title}</div>
                      <div style={{ marginTop: 5, color: "rgba(255,255,255,.48)", fontSize: 12, lineHeight: "17px", fontWeight: 500 }}>{item.date}</div>
                      {item.active ? <span style={{ position: "absolute", right: 12, top: 25, padding: "2px 8px", border: "1px solid #00e7ad", borderRadius: 999, color: "#00e7ad", fontSize: 12, fontWeight: 600 }}>Active</span>
                        : <HoverButton ariaLabel={`Actions for ${item.title}`} onClick={() => setDeleteMenu(deleteMenu === item.id ? null : item.id)} style={{ position: "absolute", right: 10, top: 26, width: 16, height: 16, borderRadius: 999, padding: 0, fontSize: 10, letterSpacing: "-1px" }}>•••</HoverButton>}
                      {deleteMenu === item.id && (
                        <button
                          type="button"
                          onClick={() => { setDeleteTarget(item); setOverlay("delete"); setDeleteMenu(null); }}
                          style={{
                            position: "absolute",
                            zIndex: 5,
                            right: 0,
                            top: 54,
                            height: 38,
                            padding: "4px 8px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,60,164,.65)",
                            background: "#13151a",
                            color: "#ff3ca4",
                            fontFamily: "inherit",
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <DeleteIcon />
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </section>
              ))
            }
          </main>
        ) : null}

        {/* Input / Footer */}
        {screen !== "history"
          ? <InputBox
              value={message}
              onChange={setMessage}
              onSend={send}
              inputRef={inputRef}
              attachment={attachment}
              onAttach={attachFile}
              onRemoveAttachment={clearAttachment}
            />
          : <div style={{ flex: "0 0 auto", margin: "0 16px 18px", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.08)", textAlign: "center", color: "rgba(255,255,255,.45)", fontSize: 12 }}>Conversation history is stored for up to 30 days.</div>}

        {/* SETTINGS overlay */}
        {overlay === "settings" && (
          <div onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setOverlay("none"); }} style={{ position: "absolute", inset: 0, zIndex: 30, display: "flex", alignItems: "flex-end", background: "rgba(6,7,10,.5)" }}>
            <div onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} style={{ width: "100%", padding: "16px 12px 12px", border: "1px solid rgba(255,255,255,.36)", borderRadius: "24px 24px 0 0", background: "#111316" }}>
              <div style={{ position: "relative", textAlign: "center", marginBottom: 15, color: "#fff", fontSize: 13, fontWeight: 600 }}>Setting<HoverButton ariaLabel="Close settings" onClick={() => setOverlay("none")} style={{ position: "absolute", right: 0, top: -6, width: 28, height: 28, borderRadius: 999, padding: 0 }}><XIcon /></HoverButton></div>
              <SettingOption title="Rename My Brain" description="Change your companion's name" onClick={openRename} />
              <SettingOption title="Conversation History" description="View and manage your past chats" onClick={showHistory} />
              <button type="button" onClick={() => setOverlay("none")} style={{ width: "100%", height: 42, marginTop: 10, borderRadius: 999, border: "1px solid rgba(255,255,255,.36)", background: "transparent", color: "rgba(255,255,255,.65)", fontFamily: "inherit", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        )}

        {overlay === "rename" && (
          <Modal title="Rename My Brain" onClose={() => setOverlay("none")}>
            <p style={{ margin: "0 0 18px", color: "rgba(255,255,255,.62)", fontSize: 13, lineHeight: "20px", fontWeight: 600 }}>This name will be used for future insights and interactions.</p>
            <div style={{ height: 42, borderRadius: 10, border: `1.2px solid ${renameError ? "#ff3ca4" : renameCount ? "#c7a4ff" : "rgba(255,255,255,.56)"}`, display: "flex", alignItems: "center", gap: 8, padding: "0 11px", background: "rgba(255,255,255,.02)" }}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M7.29166 0.750135C8.0488 0.343734 9.03361 -0.140565 9.84049 0.420057C10.4439 0.84 10.3469 1.4124 10.3991 2.04896C10.4746 2.9671 11.047 3.63759 11.7965 4.1349C12.745 4.76412 13.4938 5.38503 14.0065 6.41322C14.4793 7.3617 14.7209 8.41061 14.859 9.45228C15.0731 11.0692 15.0574 12.8552 14.7184 14.4562C14.6786 14.6449 14.6265 14.8351 14.5202 14.9972C14.2952 15.3398 13.7321 15.4868 13.5612 15.0236C13.5118 14.8899 13.4894 14.7431 13.4069 14.6261C13.3708 14.5748 13.3201 14.5289 13.2575 14.5167C13.176 14.501 13.0937 14.5456 13.0358 14.6046C12.8872 14.7566 12.8598 14.9852 12.7653 15.1749C12.628 15.4493 12.332 15.6395 12.0212 15.6544C11.2406 15.6915 11.233 14.9529 10.8385 14.5148C10.6468 14.3021 10.3255 14.2029 10.0475 14.2921C9.74085 14.3905 9.59872 14.7184 9.30534 14.841C8.99207 14.9718 8.62104 14.9807 8.30924 14.841C8.16028 14.7738 8.02564 14.678 7.8776 14.6095C7.48919 14.4305 7.24075 14.6394 7.05143 14.964C6.83733 15.3313 6.58969 15.675 6.15104 15.7892C5.50179 15.9577 4.97267 15.6144 4.69596 15.0626C4.47379 14.6189 4.11766 13.9373 3.50456 14.3341C3.0812 14.6081 3.22332 15.2181 2.86002 15.5412C2.325 16.0166 1.77308 15.5661 1.5153 15.0529C1.27187 14.5682 1.14126 14.0402 1.07291 13.4992L1.04459 13.2384C0.988346 12.6278 0.999154 12.0059 1.00456 11.4152C1.01596 10.132 1.19471 8.84376 1.59538 7.62025C2.2638 5.57823 3.49535 3.74029 5.12272 2.31166C5.79148 1.72451 6.50284 1.17374 7.29166 0.750135ZM5.15299 7.4933C4.50875 7.4933 3.98614 8.0151 3.986 8.65932C3.986 9.30365 4.50866 9.82631 5.15299 9.82631C5.7973 9.82627 6.31998 9.30363 6.31998 8.65932C6.31984 8.01512 5.79721 7.49334 5.15299 7.4933ZM10.154 7.4933C9.50978 7.49336 8.98712 8.01514 8.98698 8.65932C8.98698 9.30361 9.50969 9.82624 10.154 9.82631C10.7983 9.82631 11.321 9.30365 11.321 8.65932C11.3208 8.0151 10.7982 7.4933 10.154 7.4933Z"
                  fill={renameError ? "#FF41A3" : renameCount ? "#AF94DD" : "#B5B5B5"} />
              </svg>
              <input autoFocus value={renameValue} onChange={(e) => setRenameValue(e.target.value)} placeholder="Give me a name..." style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: "transparent", color: "rgba(255,255,255,.92)", fontFamily: "inherit", fontWeight: 700, fontSize: 13 }} />
              {renameValue && <HoverButton ariaLabel="Clear name" onClick={() => setRenameValue("")} style={{ width: 22, height: 22, borderRadius: 999, padding: 0 }}><XIcon /></HoverButton>}
            </div>
            <div style={{ textAlign: "right", color: renameError ? "#ff3ca4" : "rgba(255,255,255,.58)", fontWeight: 700, fontSize: 12, margin: "6px 0 26px" }}>{renameCount}/15</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button type="button" disabled={!renameCount || renameError} onClick={() => { setPendingName(renameValue.trim()); setOverlay("rename-success"); }} style={{ minHeight: 40, borderRadius: 999, border: 0, background: "linear-gradient(90deg,#7157f3,#89d8ba)", color: "#fff", opacity: !renameCount || renameError ? .45 : 1, fontFamily: "inherit", fontWeight: 600, fontSize: 13, cursor: !renameCount || renameError ? "default" : "pointer" }}>Save</button>
              <button type="button" onClick={() => setOverlay("none")} style={{ minHeight: 40, borderRadius: 999, border: "1px solid rgba(255,255,255,.36)", background: "transparent", color: "rgba(255,255,255,.74)", fontFamily: "inherit", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
            </div>
          </Modal>
        )}

        {overlay === "rename-success" && (
          <Modal title="Saved Successfully!" onClose={() => { setBrainName(pendingName || brainName); setOverlay("none"); }}>
            <p style={{ margin: "0 0 28px", color: "rgba(255,255,255,.62)", fontSize: 13, lineHeight: "20px", fontWeight: 600 }}>{pendingName} will be your trading companion on the journey ahead.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button type="button" onClick={() => { setBrainName(pendingName || brainName); setOverlay("none"); }} style={{ minHeight: 40, borderRadius: 999, border: 0, background: "linear-gradient(90deg,#7157f3,#89d8ba)", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Close</button>
              <button type="button" onClick={() => setOverlay("rename")} style={{ minHeight: 40, borderRadius: 999, border: "1px solid rgba(255,255,255,.36)", background: "transparent", color: "rgba(255,255,255,.74)", fontFamily: "inherit", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Edit Name</button>
            </div>
          </Modal>
        )}

        {overlay === "quick-start" && (
          <QuickStartOverlay onClose={() => setOverlay("none")} />
        )}

        {overlay === "delete" && deleteTarget && (
          <Modal title="Delete Chat?" onClose={() => { setOverlay("none"); setDeleteTarget(null); }}>
            <p style={{ margin: "0 0 28px", color: "rgba(255,255,255,.62)", fontSize: 13, lineHeight: "20px", fontWeight: 600 }}>This will delete {deleteTarget.title}.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button type="button" onClick={() => { setHistory((items) => items.filter((i) => i.id !== deleteTarget.id)); setOverlay("none"); setDeleteTarget(null); }} style={{ minHeight: 40, borderRadius: 999, border: 0, background: "#ff3ca4", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Delete</button>
              <button type="button" onClick={() => { setOverlay("none"); setDeleteTarget(null); }} style={{ minHeight: 40, borderRadius: 999, border: "1px solid rgba(255,255,255,.36)", background: "transparent", color: "rgba(255,255,255,.74)", fontFamily: "inherit", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}

// ─── Supporting components ────────────────────────────────────────────────────

function SettingOption({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}
      style={{ width: "100%", minHeight: 64, padding: "11px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left", background: hovered ? "rgba(255,255,255,.06)" : "transparent", color: "#fff", fontFamily: "inherit", cursor: "pointer", transition: "background-color 160ms ease" }}>
      <span>
        <span style={{ display: "block", fontSize: 13, lineHeight: "18px", fontWeight: 600 }}>{title}</span>
        <span style={{ display: "block", marginTop: 4, color: "rgba(255,255,255,.52)", fontSize: 12, lineHeight: "17px", fontWeight: 500 }}>{description}</span>
      </span>
      <Chevron />
    </button>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: "absolute", inset: 0, zIndex: 35, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(6,7,10,.5)" }}>
      <div role="dialog" aria-modal="true" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} style={{ width: "100%", borderRadius: 12, border: "1px solid rgba(255,255,255,.42)", background: "#111316", padding: "17px 16px 14px", boxShadow: "0 10px 30px rgba(0,0,0,.3)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ margin: 0, color: "#fff", fontSize: 13, lineHeight: "18px", fontWeight: 600 }}>{title}</h2>
          <HoverButton ariaLabel="Close" onClick={onClose} style={{ width: 26, height: 26, borderRadius: 999, padding: 0 }}><XIcon /></HoverButton>
        </div>
        {children}
      </div>
    </div>
  );
}

function SearchCard({ item }: { item: HistoryItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ minHeight: 72, borderRadius: 10, marginBottom: 8, padding: "13px 78px 12px 13px", position: "relative", background: hovered ? "rgba(255,255,255,.06)" : "transparent", transition: "background-color 160ms ease" }}>
      <div style={{ color: "rgba(255,255,255,.8)", fontSize: 13, lineHeight: "18px", fontWeight: 600 }}>{item.title}</div>
      <div style={{ marginTop: 5, color: "rgba(255,255,255,.46)", fontSize: 12, lineHeight: "17px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.description}</div>
      <span style={{ position: "absolute", right: 12, top: 26, color: "rgba(255,255,255,.55)", fontSize: 12, opacity: hovered ? 1 : 0, transition: "opacity 160ms ease" }}>{item.date}</span>
    </div>
  );
}
