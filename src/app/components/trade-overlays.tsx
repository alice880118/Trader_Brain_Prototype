import PostLossWindowsComponent from "../../imports/PostLossWindows-1/index";

import SettingsComponent from "../../imports/Settings/index";



export type OverlayModal = "none" | "settings" | "postloss" | "alert";



const DESIGN_W = 1920;

const DESIGN_H = 1080;

const FRAME_INSET = 28;



// ── Frame114 position in 1920 design space ──

const PANEL_X         = 1597;

const PANEL_TOP       = 51;

const LOGIN_H         = 232;

const PANEL_GAP       = 3;

const PANEL_PAD       = 12;

const BEFORE_INPUTS_H = 127;

const LIMIT_CONTENT_Y = PANEL_TOP + LOGIN_H + PANEL_GAP + PANEL_PAD;

const INPUTS_X        = PANEL_X + PANEL_PAD;

const INPUTS_W        = 320 - PANEL_PAD * 2;

const PRICE_BOX_Y     = LIMIT_CONTENT_Y + BEFORE_INPUTS_H;

const PRICE_BOX_H     = 56;

const FRAME114_GAP    = 4;

const QTY_BOX_H       = 55;

const QTY_BOX_Y       = PRICE_BOX_Y + PRICE_BOX_H + FRAME114_GAP;

const ORDER_SIZE_W    = 146;

const QTY_W           = INPUTS_W - ORDER_SIZE_W - 4;

const INPUT_PAD_X     = 12;

const INPUT_PAD_Y     = 8;

const VALUE_ROW_H     = 20;



const VALUE_Y_NUDGE   = 7;



const valueRowY = (boxY: number, boxH: number) => boxY + boxH - INPUT_PAD_Y - VALUE_ROW_H + VALUE_Y_NUDGE;



const PRICE_VALUE_Y      = valueRowY(PRICE_BOX_Y, PRICE_BOX_H);

const QTY_VALUE_Y        = valueRowY(QTY_BOX_Y, QTY_BOX_H);

const ORDER_SIZE_VALUE_Y = valueRowY(QTY_BOX_Y, QTY_BOX_H);

const PRICE_VALUE_X      = INPUTS_X + INPUT_PAD_X;

const QTY_VALUE_X        = INPUTS_X + INPUT_PAD_X;

const ORDER_SIZE_VALUE_X = INPUTS_X + QTY_W + 4 + INPUT_PAD_X;



const INPUT_VALUES = {

  price: "105,420",

  qty: "0.08",

  ordersize: "8,433",

} as const;



export const TRADE_PRICE_Y = PRICE_BOX_Y;

export const TRADE_PRICE_H = PRICE_BOX_H;

export const TRADE_QTY_Y   = QTY_BOX_Y;

export const TRADE_QTY_H   = QTY_BOX_H;



export const POSITION_ROW_1_Y = 891;

export const POSITION_ROW_2_Y = 935;

export const POSITION_ROW_H   = 44;

export const POSITIONS_TABLE_X = 306;

export const POSITIONS_TABLE_W = 1288;



const SETTINGS_W = 353;

const SETTINGS_H = 262;



const POSTLOSS_W = 408;

const POSTLOSS_H = 548;

const POSTLOSS_X = (DESIGN_W - POSTLOSS_W) / 2;

const POSTLOSS_Y = (DESIGN_H - POSTLOSS_H) / 2;



interface Props {

  modal: OverlayModal;

  inputsFilled: boolean;

  closeBtnPos: { x: number; y: number } | null;

  hoverRow: 1 | 2 | null;

  btcPositionClosed: boolean;

  onCancel: () => void;

  onConfirm: () => void;

}



function designBox(

  x: number, y: number, w: number, h: number,

  extra?: React.CSSProperties

): React.CSSProperties {

  return { position: "absolute", left: x, top: y, width: w, height: h, ...extra };

}



function Backdrop({ onClick, opacity = 0.5 }: { onClick: () => void; opacity?: number }) {

  return (

    <div

      onClick={onClick}

      style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${opacity})`, zIndex: 40 }}

    />

  );

}



/** Covers only the grey "0" and replaces it with the filled value — no labels/units duplicated */

function ValueOnlyPatch({ x, y, w, value }: { x: number; y: number; w: number; value: string }) {

  return (

    <div

      style={{

        position: "absolute",

        left: x,

        top: y,

        width: w,

        height: VALUE_ROW_H,

        zIndex: 20,

        pointerEvents: "none",

        background: "#1c1e23",

        overflow: "hidden",

      }}

    >

      <span

        style={{

          display: "block",

          fontFamily: "Poppins, sans-serif",

          fontWeight: 700,

          fontSize: 14,

          lineHeight: "20px",

          color: "rgba(255,255,255,0.9)",

          letterSpacing: "-0.42px",

          whiteSpace: "nowrap",

          fontFeatureSettings: '"lnum", "tnum"',

        }}

      >

        {value}

      </span>

    </div>

  );

}



export function TradeOverlays({

  modal, inputsFilled, closeBtnPos, hoverRow, btcPositionClosed,

  onCancel, onConfirm,

}: Props) {

  const settingsX = closeBtnPos

    ? Math.max(8, Math.min(closeBtnPos.x - SETTINGS_W / 2, DESIGN_W - SETTINGS_W - 8))

    : DESIGN_W - SETTINGS_W - FRAME_INSET;

  const settingsY = closeBtnPos

    ? closeBtnPos.y - SETTINGS_H - 12

    : DESIGN_H - SETTINGS_H - 200;



  return (
    <>
      {hoverRow === 1 && (
        <div style={designBox(POSITIONS_TABLE_X, POSITION_ROW_1_Y, POSITIONS_TABLE_W, POSITION_ROW_H, { background: "rgba(255,255,255,0.05)", pointerEvents: "none", zIndex: 4 })} />
      )}

      {hoverRow === 2 && !btcPositionClosed && (

        <div style={designBox(POSITIONS_TABLE_X, POSITION_ROW_2_Y, POSITIONS_TABLE_W, POSITION_ROW_H, { background: "rgba(255,255,255,0.05)", pointerEvents: "none", zIndex: 4 })} />

      )}



      {closeBtnPos && (modal === "settings" || modal === "postloss") && (

        <div style={designBox(0, closeBtnPos.y - 22, DESIGN_W, 44, { background: "rgba(255,255,255,0.05)", pointerEvents: "none", zIndex: 15 })} />

      )}



      {inputsFilled && (

        <>

          <ValueOnlyPatch x={PRICE_VALUE_X} y={PRICE_VALUE_Y} w={88} value={INPUT_VALUES.price} />

          <ValueOnlyPatch x={QTY_VALUE_X} y={QTY_VALUE_Y} w={44} value={INPUT_VALUES.qty} />

          <ValueOnlyPatch x={ORDER_SIZE_VALUE_X} y={ORDER_SIZE_VALUE_Y} w={52} value={INPUT_VALUES.ordersize} />

        </>

      )}



      {modal === "settings" && (

        <>

          <Backdrop onClick={onCancel} opacity={0.45} />

          <div

            style={designBox(settingsX, settingsY, SETTINGS_W, SETTINGS_H, { zIndex: 50, pointerEvents: "auto" })}

            onClick={(e) => {

              const text = (e.target as HTMLElement).closest("p")?.textContent?.trim() ?? "";

              if (text === "Cancel") onCancel();

              if (text === "Confirm") onConfirm();

            }}

          >

            <SettingsComponent />

          </div>

        </>

      )}



      {modal === "postloss" && (

        <>

          <Backdrop onClick={onCancel} opacity={0.55} />

          <div

            style={designBox(POSTLOSS_X, POSTLOSS_Y, POSTLOSS_W, POSTLOSS_H, {

              zIndex: 50,

              pointerEvents: "auto",

              boxSizing: "border-box",

            })}

            onClick={(e) => { if ((e.target as HTMLElement).closest('[data-name="close"]')) onCancel(); }}

          >

            <PostLossWindowsComponent />

          </div>

        </>

      )}

    </>

  );

}


