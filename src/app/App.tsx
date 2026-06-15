import { useEffect, useState, useRef, startTransition } from "react";
import type { ComponentType } from "react";
import type { TradingOpenMarketsProps } from "../imports/TradingOpenMarkets/index";
import { BrainWidget } from "./components/brain-widget";
import { CriticalSignalOverlay } from "./components/alert-window-panel";
import {
  TradeOverlays,
  type OverlayModal,
  POSITION_ROW_1_Y,
  POSITION_ROW_2_Y,
  POSITION_ROW_H,
  TRADE_PRICE_Y,
  TRADE_QTY_Y,
  TRADE_QTY_H,
} from "./components/trade-overlays";
import { BrainBriefModal } from "./components/brain-brief-modal";
import TraderArchetype from "../imports/Frame967/index";

type Background = "trade" | "portfolio" | "dexless";

const DESIGN_W = 1920;
const DESIGN_H = 1080;

type FrameDims = { scale: number; width: number; height: number; top: number; left: number };

function calcDims(): FrameDims {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H);
  const width  = DESIGN_W * scale;
  const height = DESIGN_H * scale;
  return { scale, width, height, top: (vh - height) / 2, left: (vw - width) / 2 };
}

const loaders: Record<Background, () => Promise<{ default: ComponentType }>> = {
  trade:     () => import("../imports/TradingOpenMarkets/index"),
  portfolio: () => import("../imports/Width1920Portfolio/index"),
  dexless:   () => import("../imports/Width1920DeXlessAi/index"),
};

export default function App() {
  const [BgComp, setBgComp]     = useState<ComponentType | null>(null);
  const [activeBg, setActiveBg] = useState<Background>("trade");
  const cache = useRef<Partial<Record<Background, ComponentType>>>({});
  const [dims, setDims]         = useState<FrameDims>(() => calcDims());

  // Overlay state
  const [overlayModal, setOverlayModal]   = useState<OverlayModal>("none");
  const [inputsFilled, setInputsFilled]   = useState(false);
  // 1920 design coords of the Close button click (Settings placement)
  const [closeBtnPos, setCloseBtnPos]     = useState<{ x: number; y: number } | null>(null);
  const [closingRow, setClosingRow]       = useState<1 | 2 | null>(null);
  const [btcPositionClosed, setBtcPositionClosed] = useState(false);
  const alertTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [briefOpen, setBriefOpen] = useState(false);
  const [brainOpen, setBrainOpen] = useState(false);
  const [hoverRow, setHoverRow]   = useState<1 | 2 | null>(null);

  const loadBg = (key: Background) => {
    if (cache.current[key]) {
      startTransition(() => { setBgComp(() => cache.current[key]!); setActiveBg(key); });
      return;
    }
    loaders[key]().then(m => {
      cache.current[key] = m.default;
      startTransition(() => { setBgComp(() => m.default); setActiveBg(key); });
    });
  };

  useEffect(() => {
    loadBg("trade");
    // Show Brain Brief on first load
    const t = setTimeout(() => setBriefOpen(true), 800);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const update = () => setDims(calcDims());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => () => { if (alertTimerRef.current) clearTimeout(alertTimerRef.current); }, []);

  useEffect(() => {
    if (brainOpen || briefOpen) setHoverRow(null);
  }, [brainOpen, briefOpen]);

  useEffect(() => {
    if (activeBg === "trade") return;
    setInputsFilled(false);
    setHoverRow(null);
    if (alertTimerRef.current) {
      clearTimeout(alertTimerRef.current);
      alertTimerRef.current = null;
    }
    if (overlayModal !== "none") {
      setOverlayModal("none");
      setCloseBtnPos(null);
      setClosingRow(null);
    }
  }, [activeBg]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFrameClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Block background interactions while Brain, Brief, or blocking modals are open
    if (overlayModal === "settings" || overlayModal === "postloss" || brainOpen || briefOpen) return;

    const rect   = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const frameX = (e.clientX - rect.left) / dims.scale; // 1920px design coords
    const frameY = (e.clientY - rect.top)  / dims.scale;

    const p    = (e.target as HTMLElement).closest("p");
    const text = p?.textContent?.trim() ?? "";

    // ── Nav routing (top 60px in design) ───────────────────────
    if (frameY < 60) {
      if (text === "Portfolio")  { loadBg("portfolio"); return; }
      if (text === "DEXless AI") { loadBg("dexless");   return; }
      if (text === "Trade")      { loadBg("trade");     return; }
      return;
    }

    // ── "View Today's Brief" button on DEXless AI page ─────────
    if (activeBg === "dexless" && text === "View Today's Brief") {
      setBriefOpen(true);
      return;
    }

    // ── Feature 1: Close button in Positions (y > 600) ─────────
    if (activeBg === "trade" && text === "Close" && frameY > 600) {
      if (frameY >= POSITION_ROW_1_Y && frameY < POSITION_ROW_1_Y + POSITION_ROW_H) {
        if (btcPositionClosed) return;
        setClosingRow(1);
      } else if (!btcPositionClosed && frameY >= POSITION_ROW_2_Y && frameY < POSITION_ROW_2_Y + POSITION_ROW_H) {
        setClosingRow(2);
      } else {
        setClosingRow(null);
      }
      setCloseBtnPos({ x: frameX, y: frameY });
      setOverlayModal("settings");
      return;
    }

    // ── Feature 2: click order input → fill values → alert after 1s; click again to reset ──
    if (activeBg === "trade" && frameX > 1597 && frameX < 1930) {
      const inInputZone = frameY >= TRADE_PRICE_Y && frameY < TRADE_QTY_Y + TRADE_QTY_H;
      if (inInputZone) {
        if (inputsFilled) {
          setInputsFilled(false);
          if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
          alertTimerRef.current = null;
          if (overlayModal === "alert") setOverlayModal("none");
          return;
        }
        setInputsFilled(true);
        if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
        alertTimerRef.current = setTimeout(() => setOverlayModal("alert"), 1000);
        return;
      }
    }
  };

  const handleCancel   = () => {
    setOverlayModal("none");
    setClosingRow(null);
    setCloseBtnPos(null);
  };
  const handleConfirm  = () => {
    if (closingRow === 1) setBtcPositionClosed(true);
    setOverlayModal("postloss");
  };
  const handleAlertClose = () => {
    setOverlayModal("none");
    setCloseBtnPos(null);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", position: "relative", overflow: "hidden" }}>
      <style>{`
        [data-name="Nav Bar menu"] { cursor: pointer; }
        [data-name="close"] { cursor: pointer; }
        [data-name="Button"] { cursor: pointer; }
        [data-name="button-xs"] { cursor: pointer; }
        [data-name="Behavioral Tag"] { cursor: pointer; }
        button, [role="button"] { cursor: pointer; }
        input, textarea, [data-name*="input"], [data-name*="Input"] { cursor: pointer; }
        a { cursor: pointer; }
        [data-name="LimitNormalWithTpSl"] *,
        [data-name="Limit/Normal with TP/SL"] * { cursor: pointer !important; }
        [data-name="OrdersTab"] [data-name*="Close"],
        [data-name="Position Close"],
        [data-name="Position Close"] * { cursor: pointer !important; }
        [data-name="Positions"] { cursor: default; }
        ${activeBg === "portfolio" ? `
        [data-name="Default"] { visibility: hidden !important; pointer-events: none !important; }
        ` : ""}
      `}</style>

      {/* Centered frame */}
      <div
        style={{
          position: "absolute",
          top: dims.top,
          left: dims.left,
          width: dims.width,
          height: dims.height,
          overflow: "hidden",
        }}
      >
        {/* Scaled background — click handlers only here so Brain/Brief overlays never bubble through */}
        <div
          style={{
            position: "absolute", top: 0, left: 0,
            width: DESIGN_W, height: DESIGN_H,
            transformOrigin: "top left",
            transform: `scale(${dims.scale})`,
            pointerEvents: brainOpen || briefOpen || overlayModal === "settings" || overlayModal === "postloss" ? "none" : "auto",
          }}
          onClick={handleFrameClick}
          onMouseMove={(e) => {
            if (brainOpen || briefOpen || overlayModal === "settings" || overlayModal === "postloss") {
              if (hoverRow !== null) setHoverRow(null);
              return;
            }
            if (activeBg !== "trade") { if (hoverRow !== null) setHoverRow(null); return; }
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const fy = (e.clientY - rect.top) / dims.scale;
            if (fy >= POSITION_ROW_1_Y && fy < POSITION_ROW_1_Y + POSITION_ROW_H) {
              if (hoverRow !== 1) setHoverRow(1);
            }
            else if (!btcPositionClosed && fy >= POSITION_ROW_2_Y && fy < POSITION_ROW_2_Y + POSITION_ROW_H) { if (hoverRow !== 2) setHoverRow(2); }
            else { if (hoverRow !== null) setHoverRow(null); }
          }}
          onMouseLeave={() => setHoverRow(null)}
        >
          {BgComp
            ? activeBg === "trade"
              ? (() => {
                  const TradeBg = BgComp as ComponentType<TradingOpenMarketsProps>;
                  return <TradeBg btcPositionClosed={btcPositionClosed} />;
                })()
              : <BgComp />
            : <div style={{ width: "100%", height: "100%", background: "#0c0d10" }} />}
          {activeBg === "trade" && (
            <TradeOverlays
              modal={overlayModal}
              inputsFilled={inputsFilled}
              closeBtnPos={closeBtnPos}
              hoverRow={hoverRow}
              btcPositionClosed={btcPositionClosed}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          )}
        </div>

        {/* Trader Archetype React component — overlays Default3 panel on Portfolio page */}
        {activeBg === "portfolio" && (
          <div
            style={{
              position: "absolute",
              left: 1330 * dims.scale,
              top: 99 * dims.scale,
              width: 350,
              transform: `scale(${dims.scale})`,
              transformOrigin: "top left",
              pointerEvents: "auto",
              zIndex: 5,
            }}
          >
            <TraderArchetype onTalkToBrain={() => setBrainOpen(true)} />
          </div>
        )}

        {/* Today's Brain Brief modal (50% black overlay + popup) */}
        <BrainBriefModal
          isOpen={briefOpen}
          onClose={() => setBriefOpen(false)}
          onViewFullAnalysis={() => { loadBg("dexless"); setBriefOpen(false); }}
          scale={dims.scale}
        />

        {/* Brain widget — above page overlays when open */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: brainOpen ? "auto" : "none", zIndex: 200 }}>
          <BrainWidget open={brainOpen} onOpenChange={setBrainOpen} scale={dims.scale} />
        </div>

        {/* Critical Signal — in front of Brain icon */}
        {activeBg === "trade" && overlayModal === "alert" && (
          <CriticalSignalOverlay scale={dims.scale} onClose={handleAlertClose} />
        )}
      </div>
    </div>
  );
}
