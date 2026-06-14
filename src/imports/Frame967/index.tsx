import { useEffect, useRef, useState } from "react";
import brainMp4  from "../brain.mp4";
import infoSvg   from "../info.svg";
import behavioralTagSvg from "../behavioral-tag.svg";
import reactRightSvg    from "../react-right.svg";

// ── Types ─────────────────────────────────────────────────────────────────────
type TagColor = "gradient" | "purple" | "lime" | "pink";
type Tag = { label: string; color: TagColor };
type PositionedTag = Tag & { x: number; y: number; width: number; height: number };

// ── Tag data ──────────────────────────────────────────────────────────────────
const TAGS: Tag[] = [
  { label: "Exit Liquidity Hero",    color: "gradient" },
  { label: "Diamond Delusion",       color: "purple"   },
  { label: "Revenge Hunter",         color: "lime"     },
  { label: "Hopium Scalping Master", color: "pink"     },
  { label: "Mean Reversion Bias",    color: "gradient" },
  { label: "Stable Sizing",          color: "purple"   },
  { label: "Volatility Chasing",     color: "pink"     },
  { label: "Tilt Trading",           color: "lime"     },
];

const CARD_W = 318, CARD_H = 173;
const BRAIN_W = 120, BRAIN_H = 106;
const brainRect = { x: (CARD_W - BRAIN_W) / 2, y: (CARD_H - BRAIN_H) / 2, width: BRAIN_W, height: BRAIN_H };
const GAP = 8, INSET = 4;

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }
function rnd(min: number, max: number) { return min + Math.random() * Math.max(max - min, 0); }
function intersects(a: PositionedTag, b: PositionedTag) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
function withGap(r: PositionedTag): PositionedTag {
  return { ...r, x: r.x - GAP / 2, y: r.y - GAP / 2, width: r.width + GAP, height: r.height + GAP };
}
function brainRectGapped() {
  return { x: brainRect.x - GAP / 2, y: brainRect.y - GAP / 2, width: brainRect.width + GAP, height: brainRect.height + GAP };
}

// ── CSS string ────────────────────────────────────────────────────────────────
const CSS = `
.ta-frame{width:350px;height:100%;overflow:hidden;padding:20px;color:#f7f7fa;background:#0d0f14;border-radius:4px;font-family:Poppins,ui-sans-serif,system-ui,sans-serif;box-shadow:0 18px 42px rgba(0,0,0,.28);display:flex;flex-direction:column;box-sizing:border-box;}
.ta-scroll{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;}
.ta-top-row,.ta-section-row{display:flex;align-items:center;justify-content:space-between;}
.ta-eyebrow{margin:0;color:#a7a8ad;font-size:14px;font-weight:600;}
.ta-title{margin:6px 0 22px;color:#fafafd;font-size:16px;font-weight:600;line-height:1;}
.ta-info{width:16px;height:16px;flex:0 0 16px;display:block;object-fit:contain;}
.ta-tip{position:relative;display:inline-flex;align-items:center;flex:0 0 16px;}
.ta-tip::after{position:absolute;z-index:5;width:max-content;max-width:210px;padding:9px 11px;border-radius:4px;color:#f4f4f6;background:#303238;content:attr(data-tip);font-size:12px;font-weight:500;line-height:1.35;white-space:normal;opacity:0;pointer-events:none;transform:translateY(4px);transition:opacity 160ms ease,transform 160ms ease;}
.ta-tip:hover::after,.ta-tip:focus-visible::after{opacity:1;transform:translateY(0);}
.ta-top-tip::after,.ta-confidence-tip::after{top:22px;right:0;}
.ta-behavior-tip::after,.ta-baseline-tip::after{top:24px;left:-88px;}
.ta-behavior-tip::after{max-width:none;white-space:nowrap;}
.ta-chart{position:relative;height:175px;margin-bottom:24px;overflow:hidden;border:1px solid #202a34;border-radius:4px;background:#0d0f14;box-shadow:inset 0 0 0 1px rgba(255,255,255,.015);}
.ta-brain{position:absolute;inset:0;width:100%;height:100%;background:#0d0f14;object-fit:cover;}
.ta-tag-layer{position:absolute;inset:0;}
.ta-tag{position:absolute;z-index:1;height:23px;display:flex;align-items:center;justify-content:center;padding:0 10px;border-radius:999px;color:#0d0f13;font-size:12px;font-weight:600;line-height:1;white-space:nowrap;box-shadow:0 10px 22px rgba(0,0,0,.24);transform-origin:center;will-change:opacity,transform;}
.ta-tag.entering{animation:ta-enter 420ms cubic-bezier(.2,.9,.2,1.18) both;}
.ta-tag.exiting{animation:ta-exit 260ms ease-in both;}
.ta-gradient{background:#55f4b0;}
.ta-purple{color:#fff;background:#9a73ff;}
.ta-lime{background:#ffec5f;}
.ta-pink{background:#f764bd;}
@keyframes ta-enter{0%{opacity:0;transform:translateY(7px) scale(.84);}68%{opacity:1;transform:translateY(-1px) scale(1.04);}100%{opacity:1;transform:translateY(0) scale(1);}}
@keyframes ta-exit{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-6px) scale(.86);}}
.ta-section-title{margin:0 0 12px;color:#a7a8ad;font-size:14px;font-weight:600;}
.ta-score{display:flex;align-items:baseline;gap:6px;margin-bottom:18px;line-height:.82;}
.ta-score strong{color:#fff;font-size:30px;font-weight:600;}
.ta-score span{color:#fff;font-size:13px;font-weight:600;}
.ta-track{position:relative;height:6px;overflow:hidden;border-radius:999px;background:#34373c;}
.ta-fill{position:absolute;inset:0 auto 0 0;border-radius:inherit;background:linear-gradient(90deg,#7357ff 0%,#5d85d9 29%,#87c7b7 58%,#e6fb8c 100%);}
.ta-details{margin-top:28px;padding-top:22px;border-top:1px solid #292d32;}
.ta-details-header,.ta-baseline-row,.ta-last-update{display:flex;align-items:center;justify-content:space-between;}
.ta-details-title,.ta-baseline-title{display:flex;align-items:center;gap:5px;margin:0;color:#a6a7ac;font-size:13px;font-weight:600;}
.ta-close-tags{display:none;align-items:center;gap:6px;padding:0;border:0;color:#9a9ba1;background:transparent;font-family:inherit;font-size:12px;font-weight:600;cursor:pointer;}
.ta-details.expanded .ta-close-tags{display:flex;}
.ta-close-icon{width:17px;height:17px;display:block;object-fit:contain;}
.ta-behavior-tags,.ta-expanded-tags{display:flex;flex-wrap:wrap;gap:10px 8px;}
.ta-behavior-tags{margin-top:13px;}
.ta-expanded-tags{display:none;margin-top:10px;}
.ta-details.expanded .ta-expanded-tags{display:flex;}
.ta-behavior-pill,.ta-more-tags{height:31px;display:inline-flex;align-items:center;justify-content:center;border-radius:13px;color:#d5d5d8;background:#15181d;font-size:12px;font-weight:600;white-space:nowrap;}
.ta-behavior-pill{gap:7px;padding:0 11px;border:1px solid var(--pill-border);box-shadow:inset 0 0 16px rgba(255,255,255,.01);}
.ta-dot{width:5px;height:5px;flex:0 0 5px;border-radius:1px;background:var(--pill-dot);}
.ta-more-tags{width:31px;border:1px solid #4a4e56;color:#e8e8ea;cursor:pointer;font-size:17px;line-height:1;}
.ta-more-tags img{width:17px;height:17px;display:block;}
.ta-details.expanded .ta-more-tags{display:none;}
.ta-baseline{margin-top:30px;}
.ta-baseline-card{margin-top:14px;padding:12px;border-radius:4px;background:#202228;}
.ta-baseline-row+.ta-baseline-row{margin-top:4px;}
.ta-baseline-label,.ta-baseline-unit,.ta-last-update{color:#9fa0a6;font-size:12px;font-weight:600;}
.ta-baseline-value{color:#f4f4f6;font-size:13px;font-weight:600;}
.ta-baseline-value.win{color:#52f5d2;}
.ta-baseline-value.loss{color:#ff55b7;}
.ta-footer-divider{flex-shrink:0;margin-top:12px;padding-top:16px;border-top:1px solid #292d32;background:#0d0f14;}
.ta-last-update{justify-content:center;gap:14px;color:rgba(255,255,255,.5);margin-bottom:27px;text-align:center;}
.ta-brain-cta{width:100%;height:40px;border:0;border-radius:999px;color:#fff;background:linear-gradient(90deg,#714fff 0%,#8db8cc 46%,#ddff81 100%);font-family:inherit;font-size:12px;font-weight:600;cursor:pointer;}
`;

// ── Component ─────────────────────────────────────────────────────────────────
type Props = { onTalkToBrain?: () => void };

export default function Frame967({ onTalkToBrain }: Props) {
  const layerRef    = useRef<HTMLDivElement>(null);
  const detailsRef  = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [tagNodes, setTagNodes] = useState<(PositionedTag & { key: number; entering: boolean })[]>([]);
  const keyRef = useRef(0);

  // Measure a tag's rendered size using a hidden DOM node
  function measureTag(tag: Tag): { width: number; height: number } {
    if (!layerRef.current) return { width: 100, height: 23 };
    const el = document.createElement("span");
    el.className = `ta-tag ta-${tag.color}`;
    el.textContent = tag.label;
    el.style.visibility = "hidden";
    el.style.pointerEvents = "none";
    el.style.position = "absolute";
    layerRef.current.appendChild(el);
    const size = { width: el.offsetWidth, height: el.offsetHeight };
    el.remove();
    return size;
  }

  function getUniqueColorTags(count: number): Tag[] {
    const out: Tag[] = [];
    const used = new Set<TagColor>();
    for (const t of shuffle(TAGS)) {
      if (used.has(t.color)) continue;
      out.push(t);
      used.add(t.color);
      if (out.length === count) break;
    }
    return out;
  }

  function getRandomTags(): Tag[] {
    const count = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < 30; i++) {
      const sel = getUniqueColorTags(count);
      if (sel.filter(t => t.label.trim().split(/\s+/).length === 3).length <= Math.ceil(count / 2)) return sel;
    }
    return getUniqueColorTags(count);
  }

  function placeOne(tag: Tag, placed: PositionedTag[]): PositionedTag | null {
    const size = measureTag(tag);
    const measured: PositionedTag = { ...tag, x: 0, y: 0, ...size };
    const maxX = Math.max(CARD_W - size.width - INSET, INSET);
    const maxY = Math.max(CARD_H - size.height - INSET, INSET);
    const bg = brainRectGapped();

    function valid(c: PositionedTag) {
      return !intersects(c, bg as unknown as PositionedTag) &&
             placed.every(p => !intersects(withGap(c), withGap(p)));
    }

    for (let i = 0; i < 120; i++) {
      const c: PositionedTag = { ...measured, x: rnd(INSET, maxX), y: rnd(INSET, maxY) };
      if (valid(c)) return c;
    }
    for (const pt of shuffle([
      { x: 8, y: 8 }, { x: CARD_W - size.width - 8, y: 8 },
      { x: 8, y: CARD_H - size.height - 8 }, { x: CARD_W - size.width - 8, y: CARD_H - size.height - 8 },
      { x: 8, y: brainRect.y + brainRect.height + GAP },
      { x: brainRect.x + brainRect.width + GAP, y: brainRect.y },
    ])) {
      const c: PositionedTag = {
        ...measured,
        x: Math.min(Math.max(pt.x, INSET), CARD_W - size.width - INSET),
        y: Math.min(Math.max(pt.y, INSET), CARD_H - size.height - INSET),
      };
      if (valid(c)) return c;
    }
    return null;
  }

  function buildTags(): (PositionedTag & { key: number; entering: boolean })[] {
    const sel = getRandomTags();
    const placed: PositionedTag[] = [];
    for (const t of sel) {
      const p = placeOne(t, placed);
      if (p) placed.push(p);
    }
    return placed.map(p => ({ ...p, key: ++keyRef.current, entering: true }));
  }

  useEffect(() => {
    // Initial render of tags (after a brief delay so the layer is mounted)
    const init = setTimeout(() => setTagNodes(buildTags()), 100);

    const interval = setInterval(() => {
      // Exit current tags
      setTagNodes(prev => prev.map(t => ({ ...t, entering: false })));
      // After exit anim, replace
      setTimeout(() => setTagNodes(buildTags()), 260);
    }, 5000);

    return () => { clearTimeout(init); clearInterval(interval); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <style>{CSS}</style>
      <main className="ta-frame" aria-label="Your Trader Archetype">
        <div className="ta-scroll">
        <div className="ta-top-row">
          <p className="ta-eyebrow">Your Trader Archetype</p>
          <span className="ta-tip ta-top-tip" tabIndex={0} data-tip="Your core trading personality identified by AI">
            <img className="ta-info" src={infoSvg} alt="" />
          </span>
        </div>

        <h1 className="ta-title">FOMO+LotteryRevenge</h1>

        <section className="ta-chart" aria-label="Archetype map">
          <video className="ta-brain" src={brainMp4} autoPlay muted loop playsInline />
          <div ref={layerRef} className="ta-tag-layer" aria-hidden="true">
            {tagNodes.map(t => (
              <span
                key={t.key}
                className={`ta-tag ta-${t.color} ${t.entering ? "entering" : "exiting"}`}
                style={{ left: t.x, top: t.y }}
              >
                {t.label}
              </span>
            ))}
          </div>
        </section>

        <div className="ta-section-row">
          <p className="ta-section-title">Confidence</p>
          <span className="ta-tip ta-confidence-tip" tabIndex={0} data-tip="Brain confidence level for this analysis">
            <img className="ta-info" src={infoSvg} alt="" />
          </span>
        </div>

        <div className="ta-score"><strong>88</strong><span>%</span></div>
        <div className="ta-track" aria-label="Confidence 88 percent">
          <div className="ta-fill" style={{ width: "88%" }} />
        </div>

        <section ref={detailsRef} className={`ta-details${expanded ? " expanded" : ""}`} aria-label="Behavioral details">
          <div className="ta-details-header">
            <h2 className="ta-details-title">
              Behavioral Tag{" "}
              <span className="ta-tip ta-behavior-tip" tabIndex={0} data-tip="Trading behavior patterns detected by Brain">
                <img className="ta-info" src={infoSvg} alt="" />
              </span>
            </h2>
            <button className="ta-close-tags" type="button" onClick={() => setExpanded(false)} aria-label="Close behavioral tags">
              Close <img className="ta-close-icon" src={reactRightSvg} alt="" />
            </button>
          </div>

          <div className="ta-behavior-tags">
            <span className="ta-behavior-pill" style={{ "--pill-border": "#625b26", "--pill-dot": "#fff068" } as React.CSSProperties}><span className="ta-dot" />Exit Liquidity Hero</span>
            <span className="ta-behavior-pill" style={{ "--pill-border": "#71334c", "--pill-dot": "#ff5ca8" } as React.CSSProperties}><span className="ta-dot" />Diamond Delusion</span>
            <span className="ta-behavior-pill" style={{ "--pill-border": "#236a56", "--pill-dot": "#58f0bd" } as React.CSSProperties}><span className="ta-dot" />Revenge Hunter</span>
            <button className="ta-more-tags" type="button" onClick={() => setExpanded(true)} aria-label="Show all behavioral tags">
              <img src={behavioralTagSvg} alt="" />
            </button>
          </div>

          <div className="ta-expanded-tags">
            <span className="ta-behavior-pill" style={{ "--pill-border": "#71334c", "--pill-dot": "#ff5ca8" } as React.CSSProperties}><span className="ta-dot" />Hopium Scalping Master</span>
            <span className="ta-behavior-pill" style={{ "--pill-border": "#805d31", "--pill-dot": "#ffc167" } as React.CSSProperties}><span className="ta-dot" />Mean Reversion Bias</span>
            <span className="ta-behavior-pill" style={{ "--pill-border": "#625b26", "--pill-dot": "#fff068" } as React.CSSProperties}><span className="ta-dot" />Stable Sizing</span>
            <span className="ta-behavior-pill" style={{ "--pill-border": "#71334c", "--pill-dot": "#ff5ca8" } as React.CSSProperties}><span className="ta-dot" />Volatility Chasing</span>
            <span className="ta-behavior-pill" style={{ "--pill-border": "#625b26", "--pill-dot": "#fff068" } as React.CSSProperties}><span className="ta-dot" />Tilt Trading</span>
          </div>

          <section className="ta-baseline" aria-label="Your baseline">
            <h2 className="ta-baseline-title">
              Your Baseline{" "}
              <span className="ta-tip ta-baseline-tip" tabIndex={0} data-tip="Your average trading behavior baseline">
                <img className="ta-info" src={infoSvg} alt="" />
              </span>
            </h2>
            <div className="ta-baseline-card">
              <div className="ta-baseline-row"><span className="ta-baseline-label">Avg Trades</span><span><span className="ta-baseline-value">3.6</span> <span className="ta-baseline-unit">/Day</span></span></div>
              <div className="ta-baseline-row"><span className="ta-baseline-label">Avg Win</span><span><span className="ta-baseline-value win">$1,287</span> <span className="ta-baseline-unit">/USDC</span></span></div>
              <div className="ta-baseline-row"><span className="ta-baseline-label">Avg Loss</span><span><span className="ta-baseline-value loss">$1,234</span> <span className="ta-baseline-unit">USDC</span></span></div>
            </div>
          </section>
        </section>
        </div>

        <div className="ta-footer-divider">
          <div className="ta-last-update"><span>Last Update</span><span>2026/05/09 00:00:00</span></div>
          <button className="ta-brain-cta" type="button" onClick={onTalkToBrain}>Talk to My Brain</button>
        </div>
      </main>
    </>
  );
}
