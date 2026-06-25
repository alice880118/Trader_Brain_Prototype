import { useEffect, useRef, useState } from "react";

const CURSOR_SRC = "/cursor-arrow.png";
const CURSOR_SIZE = 40;
const HOTSPOT_X = 6;
const HOTSPOT_Y = 6;
const CLICK_SCALE = 1.2;
const CLICK_DURATION_MS = 140;

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const clickTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const onDown = () => {
      setClicking(true);
      if (clickTimerRef.current !== null) {
        window.clearTimeout(clickTimerRef.current);
      }
      clickTimerRef.current = window.setTimeout(() => {
        setClicking(false);
        clickTimerRef.current = null;
      }, CLICK_DURATION_MS);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      if (clickTimerRef.current !== null) {
        window.clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        marginLeft: -HOTSPOT_X,
        marginTop: -HOTSPOT_Y,
        pointerEvents: "none",
        zIndex: 999999,
        opacity: visible ? 1 : 0,
        transform: clicking ? `scale(${CLICK_SCALE})` : "scale(1)",
        transformOrigin: `${HOTSPOT_X}px ${HOTSPOT_Y}px`,
        transition: clicking
          ? "transform 70ms ease-out"
          : "transform 120ms ease-out",
      }}
    >
      <img
        src={CURSOR_SRC}
        alt=""
        width={CURSOR_SIZE}
        height={CURSOR_SIZE}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          userSelect: "none",
        }}
      />
    </div>
  );
}
