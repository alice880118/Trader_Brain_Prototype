import svgPaths from "./svg-d2kerqg99v";
import imgTradeVoyage011 from "./9115eda548baad58998012906766474329fe11fb.png";
import imgTradeVoyage13ChangeCoin1 from "./eca22446e1393fded0faaffdd16f6b38e197b1d8.png";
import imgEllipse8163 from "./b1bff64d74a31640b7428e497a53f6ee41b68862.png";
import imgEllipse8164 from "./6a149245ad3b0fa82692fd84d753197d53d82160.png";
import imgEllipse8165 from "./2bfdb65f465b0499ff56ad641404039d39b53c1f.png";
import imgEllipse8166 from "./90d998494cfa62cff34776843b957c12d1a6fb70.png";
type SendProps = {
  className?: string;
  state?: "Default" | "disable";
};

function Send({ className, state = "Default" }: SendProps) {
  return (
    <div className={className || `bg-gradient-to-r from-[#7053f3] overflow-clip relative rounded-[999px] size-[24px] to-[#e3ff94] to-[161.52%] via-[#76bab2] via-[74.167%] ${state === "disable" ? "opacity-50" : ""}`}>
      <div className="absolute inset-[12.5%]" data-name="Frame">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <g id="Frame">
            <path d="M9 4.12887L9 14.2539" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p8993880} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
type FileProps = {
  className?: string;
  state?: "XLS" | "PDF" | "DOC" | "TXT" | "PPT";
};

function File({ className, state = "PDF" }: FileProps) {
  const isDoc = state === "DOC";
  const isDocOrTxtOrPptOrXls = ["DOC", "TXT", "PPT", "XLS"].includes(state);
  const isPpt = state === "PPT";
  const isTxt = state === "TXT";
  const isXls = state === "XLS";
  return (
    <div className={className || "bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[12px] items-start justify-end p-[6px] relative rounded-[8px]"}>
      <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
        <div className="relative shrink-0 size-[20px]" data-name="Frame">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <g id="Frame">
              <path d={svgPaths.p2e8db300} id="Vector" stroke="var(--stroke-0, #DBFD5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
        <div className={`[word-break:break-word] content-stretch flex flex-col font-["Poppins:Medium",sans-serif] gap-[2px] items-start leading-[12px] not-italic relative shrink-0 text-[10px] ${isXls ? "w-[82px]" : isPpt ? "w-[99px]" : isTxt ? "w-[72px]" : isDoc ? "w-[85px]" : ""}`}>
          <p className={`relative shrink-0 text-white ${isDocOrTxtOrPptOrXls ? "w-full" : "whitespace-nowrap"}`}>{isXls ? "Market Replay... " : isPpt ? "Trade Screenshot... " : isTxt ? "Market Data... " : isDoc ? "Strategy Notes... " : "Trading Rules... "}</p>
          <p className={`relative shrink-0 text-[rgba(255,255,255,0.5)] ${isDocOrTxtOrPptOrXls ? "w-full" : "min-w-full w-[min-content]"}`}>{isXls ? "XLS" : isPpt ? "PPT" : isTxt ? "TXT" : isDoc ? "DOC" : "PDF"}</p>
        </div>
      </div>
      <div className="bg-[#15171b] content-stretch flex items-center justify-center p-[4px] relative rounded-[999px] shrink-0 size-[12px]">
        <div className="overflow-clip relative shrink-0 size-[8px]" data-name="close">
          <div className="absolute inset-[16.27%_16.64%_17.01%_16.6%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0224 16.0117">
              <path d={svgPaths.p90d8a80} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type AddFileProps = {
  className?: string;
  size?: "m" | "s";
  state?: "Default" | "demo_light" | "demo_dark";
};

function AddFile({ className, size = "m", state = "Default" }: AddFileProps) {
  const isDemoDark = state === "demo_dark";
  const isDemoLight = state === "demo_light";
  const isS = size === "s";
  return (
    <div className={className || `bg-[rgba(255,255,255,0.05)] overflow-clip relative ${isS ? "rounded-[8px] size-[48px]" : "rounded-[12px] size-[72px]"}`}>
      {state === "Default" && (
        <div className={`absolute bg-[#15171b] content-stretch flex items-center justify-center p-[4px] rounded-[999px] top-[6px] ${isS ? "right-[7px] size-[12px]" : "right-[5px] size-[20px]"}`}>
          <div className={`overflow-clip relative shrink-0 ${isS ? "size-[8px]" : "size-[11px]"}`} data-name="close">
            <div className="absolute inset-[16.27%_16.64%_17.01%_16.6%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0224 16.0117">
                <path d={svgPaths.p90d8a80} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {isDemoLight && (
        <>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[123px] left-[calc(50%+0.5px)] top-1/2 w-[129px]" data-name="TradeVoyage 01 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[234.48%] left-[-67.15%] max-w-none top-[-67.24%] w-[234.29%]" src={imgTradeVoyage011} />
            </div>
          </div>
          <div className={`absolute bg-[#15171b] content-stretch flex items-center justify-center p-[4px] rounded-[999px] top-[6px] ${isS ? "right-[7px] size-[12px]" : "right-[5px] size-[20px]"}`}>
            <div className={`overflow-clip relative shrink-0 ${isS ? "size-[8px]" : "size-[11px]"}`} data-name="close">
              <div className="absolute inset-[16.27%_16.64%_17.01%_16.6%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0224 16.0117">
                  <path d={svgPaths.p90d8a80} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
      {isDemoDark && (
        <>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[114px] left-1/2 top-1/2 w-[132px]" data-name="TradeVoyage 13 change coin 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[233.21%] left-0 max-w-none top-[-112.23%] w-[210.09%]" src={imgTradeVoyage13ChangeCoin1} />
            </div>
          </div>
          <div className={`absolute bg-[#15171b] content-stretch flex items-center justify-center p-[4px] rounded-[999px] top-[6px] ${isS ? "right-[7px] size-[12px]" : "right-[5px] size-[20px]"}`}>
            <div className={`overflow-clip relative shrink-0 ${isS ? "size-[8px]" : "size-[11px]"}`} data-name="close">
              <div className="absolute inset-[16.27%_16.64%_17.01%_16.6%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0224 16.0117">
                  <path d={svgPaths.p90d8a80} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
type AddProps = {
  className?: string;
  state?: "disable" | "Default";
};

function Add({ className, state = "Default" }: AddProps) {
  const isDisable = state === "disable";
  return (
    <div className={className || "content-stretch flex items-center justify-center relative rounded-[999px] size-[20px]"}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="add">
        <div className="absolute inset-[12.21%_12.54%_12.79%_12.46%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isDisable ? "0 0 18 18" : "0 0 12 12"}>
            <path d={isDisable ? svgPaths.p1af25700 : svgPaths.p31ff1000} fill={isDisable ? "var(--fill-0, black)" : "var(--fill-0, white)"} fillOpacity={state === "Default" ? "0.8" : undefined} id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}
type FunctionProps = {
  className?: string;
  state?: "m";
};

function Function({ className, state = "m" }: FunctionProps) {
  return (
    <div className={className || "content-stretch flex items-center justify-between relative w-[316.6px]"}>
      <Add className="content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[20px]" />
      <Send className="bg-gradient-to-r from-[#7053f3] overflow-clip relative rounded-[999px] shrink-0 size-[24px] to-[#e3ff94] to-[161.52%] via-[#76bab2] via-[74.167%]" />
    </div>
  );
}
type BottonNavBarProps = {
  className?: string;
  size?: "s" | "m";
  state?: "Default" | "input" | "short" | "add one img" | "add more then one file" | "add one file" | "add more then one  img" | "defaut";
};

function BottonNavBar({ className, size = "m", state = "Default" }: BottonNavBarProps) {
  const isAddMoreThenOneFileAndM = state === "add more then one file" && size === "m";
  const isAddMoreThenOneImgAndM = state === "add more then one  img" && size === "m";
  const isAddOneFile = state === "add one file";
  const isAddOneImg = state === "add one img";
  const isInput = state === "input";
  const isInputAndM = state === "input" && size === "m";
  const isMAndIsAddOneImgOrAddMoreThenOneImgOrAddOneFileOrAddMoreThenOne = size === "m" && ["add one img", "add more then one  img", "add one file", "add more then one file"].includes(state);
  const isMAndIsDefaultOrInputOrShort = size === "m" && ["Default", "input", "short"].includes(state);
  const isSAndIsDefautOrInput = size === "s" && ["defaut", "input"].includes(state);
  const isSAndIsDefautOrInputOrAddOneImgOrAddOneFile = size === "s" && ["defaut", "input", "add one img", "add one file"].includes(state);
  const isShortAndM = state === "short" && size === "m";
  return (
    <div className={className || `content-stretch flex flex-col items-center relative w-[375px] ${isSAndIsDefautOrInputOrAddOneImgOrAddOneFile ? "" : "pb-[16px] px-[12px]"}`}>
      <div className={`content-stretch flex flex-col items-center relative shrink-0 w-full ${isShortAndM ? "h-[80px]" : ""}`}>
        <div className={`relative rounded-[16px] shrink-0 w-full ${state === "defaut" && size === "s" ? "" : isAddOneImg || isAddMoreThenOneImgAndM || isAddOneFile || isAddMoreThenOneFileAndM || (state === "input" && size === "s") ? "drop-shadow-[0px_0px_5.6px_rgba(221,200,255,0.6)]" : isShortAndM ? "h-[80px]" : isInputAndM ? "drop-shadow-[0px_0px_5.6px_rgba(221,200,255,0.6)] h-[131px]" : "h-[131px]"}`} style={state === "add one file" && size === "s" ? { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 375 96.4' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.3269 18.471 -34.899 -3.8786 70.513 -119.95)'><stop stop-color='rgba(255,255,255,0.22)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(18, 20, 24) 0%, rgb(18, 20, 24) 100%)" } : state === "add one img" && size === "s" ? { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 375 130.4' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.3269 24.985 -34.899 -5.2466 70.513 -162.25)'><stop stop-color='rgba(255,255,255,0.22)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(18, 20, 24) 0%, rgb(18, 20, 24) 100%)" } : isSAndIsDefautOrInput ? { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 375 50.4' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.3269 9.6568 -34.899 -2.0278 70.513 -62.711)'><stop stop-color='rgba(255,255,255,0.22)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(18, 20, 24) 0%, rgb(18, 20, 24) 100%)" } : size === "m" && ["add one file", "add more then one file"].includes(state) ? { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 351 122.4' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.05 23.452 -32.666 -4.9247 66 -152.3)'><stop stop-color='rgba(255,255,255,0.22)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(18, 20, 24) 0%, rgb(18, 20, 24) 100%)" } : isAddMoreThenOneImgAndM ? { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 351 132.4' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.05 25.368 -32.666 -5.3271 66 -164.74)'><stop stop-color='rgba(255,255,255,0.22)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(18, 20, 24) 0%, rgb(18, 20, 24) 100%)" } : state === "add one img" && size === "m" ? { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 351 156.4' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.05 29.967 -32.666 -6.2927 66 -194.6)'><stop stop-color='rgba(255,255,255,0.22)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(18, 20, 24) 0%, rgb(18, 20, 24) 100%)" } : isShortAndM ? { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 351 80' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.05 15.328 -32.666 -3.2188 66 -99.542)'><stop stop-color='rgba(255,255,255,0.22)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(18, 20, 24) 0%, rgb(18, 20, 24) 100%)" } : { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 351 131' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.05 25.1 -32.666 -5.2708 66 -163)'><stop stop-color='rgba(255,255,255,0.22)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(18, 20, 24) 0%, rgb(18, 20, 24) 100%)" }} data-name="asking box">
          <div aria-hidden className={`absolute border-[1.2px] border-solid inset-0 pointer-events-none rounded-[16px] ${["input", "add one img"].includes(state) || isAddMoreThenOneImgAndM || isAddOneFile || isAddMoreThenOneFileAndM ? "border-[#7053f3]" : "border-[#c7bcfa]"}`} />
          <div className={`flex flex-col size-full ${isSAndIsDefautOrInput ? "content-stretch items-start p-[13.2px] relative" : isAddOneImg || isAddMoreThenOneImgAndM || isAddOneFile || isAddMoreThenOneFileAndM ? "content-stretch gap-[8px] items-start px-[17.2px] py-[13.2px] relative" : "justify-center"}`}>
            {((state === "Default" && size === "m") || isInputAndM || isShortAndM || isAddOneImg || isAddMoreThenOneImgAndM || isAddOneFile || isAddMoreThenOneFileAndM) && (
              <div className={`relative ${isAddMoreThenOneFileAndM ? "shrink-0 w-[318px]" : isAddOneImg || isAddMoreThenOneImgAndM || isAddOneFile ? "shrink-0" : "content-stretch flex flex-col items-start justify-between px-[17.2px] py-[13.2px] size-full"}`}>
                {(isAddOneImg || isAddMoreThenOneImgAndM || isAddOneFile || isAddMoreThenOneFileAndM) && (
                  <div className={`bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full ${isAddMoreThenOneFileAndM ? "gap-[4px] overflow-clip rounded-[inherit]" : isAddMoreThenOneImgAndM ? "gap-[4px]" : ""}`}>
                    {(isAddOneImg || isAddMoreThenOneImgAndM) && <AddFile className={`bg-[rgba(255,255,255,0.05)] overflow-clip relative shrink-0 ${isAddMoreThenOneImgAndM ? "rounded-[8px] size-[48px]" : "rounded-[12px] size-[72px]"}`} size={isAddMoreThenOneImgAndM ? "s" : undefined} state="demo_light" />}
                    {(isAddOneFile || isAddMoreThenOneFileAndM) && <File className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[12px] items-start justify-end p-[6px] relative rounded-[8px] shrink-0" />}
                    {isAddMoreThenOneImgAndM && (
                      <>
                        <AddFile className="bg-[rgba(255,255,255,0.05)] overflow-clip relative rounded-[8px] shrink-0 size-[48px]" size="s" state="demo_dark" />
                        <div className="bg-[rgba(255,255,255,0.05)] overflow-clip relative rounded-[8px] shrink-0 size-[48px]" data-name="add file">
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[114px] left-1/2 top-1/2 w-[132px]" data-name="TradeVoyage 13 change coin 1">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              <img alt="" className="absolute h-[233.21%] left-0 max-w-none top-[-112.23%] w-[210.09%]" src={imgTradeVoyage13ChangeCoin1} />
                            </div>
                          </div>
                          <div className="absolute bg-[#15171b] content-stretch flex items-center justify-center p-[4px] right-[7px] rounded-[999px] size-[12px] top-[6px]">
                            <div className="overflow-clip relative shrink-0 size-[8px]" data-name="close">
                              <div className="absolute inset-[16.27%_16.64%_17.01%_16.6%]" data-name="Vector">
                                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0224 16.0117">
                                  <path d={svgPaths.p90d8a80} fill="var(--fill-0, black)" id="Vector" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {isAddMoreThenOneFileAndM && (
                      <>
                        <File className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[12px] items-start justify-end p-[6px] relative rounded-[8px] shrink-0" state="DOC" />
                        <File className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[12px] items-start justify-end p-[6px] relative rounded-[8px] shrink-0" state="TXT" />
                      </>
                    )}
                  </div>
                )}
                {isMAndIsDefaultOrInputOrShort && (
                  <>
                    <p className={`[word-break:break-word] leading-[18px] not-italic relative shrink-0 text-[13px] whitespace-nowrap ${isInput ? 'font-["Poppins:Medium",sans-serif] text-white' : 'font-["Poppins:SemiBold",sans-serif] text-[rgba(255,255,255,0.3)]'}`}>{isInput ? "I want to long BTC with 20U" : state === "short" ? "Tell me about your trading habits..." : "Tell me about your trading habits..."}</p>
                    <Function className="relative shrink-0 w-[316.6px]" />
                  </>
                )}
              </div>
            )}
            {isMAndIsAddOneImgOrAddMoreThenOneImgOrAddOneFileOrAddMoreThenOne && (
              <>
                <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[18px] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.3)] whitespace-nowrap">Tell me about your trading habits...</p>
                <Function className="relative shrink-0 w-[316.6px]" />
              </>
            )}
            {isSAndIsDefautOrInputOrAddOneImgOrAddOneFile && (
              <div className="relative shrink-0 w-full" data-name="function">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                    <div className="content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[24px]" data-name="add">
                      <div className="overflow-clip relative shrink-0 size-[19px]" data-name="add">
                        <div className="absolute inset-[12.21%_12.54%_12.79%_12.46%]" data-name="Vector">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                            <path d={svgPaths.p1af25700} fill="var(--fill-0, black)" id="Vector" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[18px] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.3)] whitespace-nowrap">Tell me about your trading habits...</p>
                  </div>
                  <Send className="bg-gradient-to-r from-[#7053f3] overflow-clip relative rounded-[999px] shrink-0 size-[24px] to-[#e3ff94] to-[161.52%] via-[#76bab2] via-[74.167%]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
type QuestionTagProps = {
  className?: string;
  color?: "outline" | "fill";
  state?: "Default" | "hover";
};

function QuestionTag({ className, color = "fill", state = "Default" }: QuestionTagProps) {
  const isFill = color === "fill";
  const isOutline = color === "outline";
  return (
    <div className={className || `relative rounded-[8px] ${state === "hover" && color === "fill" ? "bg-gradient-to-r content-stretch flex from-[#e2d0ff] items-center overflow-clip px-[10px] py-[4px] to-[#e4ff81]" : state === "Default" && color === "fill" ? "bg-gradient-to-r content-stretch flex from-[#c6a4ff] items-center overflow-clip px-[10px] py-[4px] to-[#dbfd5c]" : state === "hover" && color === "outline" ? "bg-[#2d2d2d]" : "bg-black"}`}>
      <div className={`flex relative ${isFill ? '[word-break:break-word] flex-col font-["Poppins:SemiBold",sans-serif] justify-center leading-[0] not-italic shrink-0 text-[12px] text-black whitespace-nowrap' : "content-stretch gap-[4px] items-center overflow-clip px-[10px] py-[4px] rounded-[inherit] size-full"}`}>
        {isOutline && (
          <>
            <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#dbfd5c] text-[12px] whitespace-nowrap">
              <p className="leading-[18px]">Chat with Brain</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div className="h-[14px] relative w-[15px]" data-name="Frame">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14">
                    <g id="Frame">
                      <path d={svgPaths.p3ee20880} id="Vector" stroke="var(--stroke-0, #DBFD5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p627b4e0} id="Vector_2" stroke="var(--stroke-0, #DBFD5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}
        {isFill && <p className="leading-[18px]">{`What's happening today?`}</p>}
      </div>
      {isOutline && <div aria-hidden className="absolute border border-[#dbfd5c] border-solid inset-0 pointer-events-none rounded-[8px]" />}
    </div>
  );
}
type SettingProps = {
  className?: string;
  state?: "Default" | "hover";
};

function Setting({ className, state = "Default" }: SettingProps) {
  const isHover = state === "hover";
  return (
    <div className={className || `overflow-clip relative rounded-[999px] size-[24px] ${isHover ? "bg-[rgba(255,255,255,0.05)]" : ""}`}>
      <div className="absolute inset-[16.67%_18.33%_16.67%_16.67%]">
        <div className="absolute inset-[-4.69%_-4.81%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1001 17.5">
            <g id="Group 1533214004">
              <path d={svgPaths.p2a62fb00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeOpacity={isHover ? "0.8" : "0.6"} strokeWidth="1.5" />
              <path d={svgPaths.p675500} id="Vector_2" stroke="var(--stroke-0, white)" strokeOpacity={isHover ? "0.8" : "0.6"} strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
type OpenInNewProps = {
  className?: string;
  property1?: "Default" | "hover";
};

function OpenInNew({ className, property1 = "Default" }: OpenInNewProps) {
  const isHover = property1 === "hover";
  return (
    <div className={className || `overflow-clip relative rounded-[999px] size-[24px] ${isHover ? "bg-[rgba(255,255,255,0.05)]" : ""}`}>
      <div className="absolute inset-[16.67%]">
        <div className="absolute inset-[-4.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
            <g id="Group 1533214005">
              <path d={svgPaths.p2b058218} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={isHover ? "0.8" : "0.6"} strokeWidth="1.5" />
              <path d={svgPaths.p2ce46c80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={isHover ? "0.8" : "0.6"} strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
type SupportNavProps = {
  className?: string;
  size?: "m" | "s";
  state?: "Default" | "Conversation History" | "Rename My Brain";
};

function SupportNav({ className, size = "m", state = "Default" }: SupportNavProps) {
  const isConversationHistoryAndM = state === "Conversation History" && size === "m";
  const isRenameMyBrainAndM = state === "Rename My Brain" && size === "m";
  const isS = size === "s";
  return (
    <div className={className || `content-stretch flex flex-col items-start relative ${isS ? "p-[12px] w-[393px]" : "pb-[8px] pt-[16px] px-[16px] w-[375px]"}`}>
      <div className={`content-stretch flex items-center justify-between relative shrink-0 w-full ${size === "m" && ["Conversation History", "Rename My Brain"].includes(state) ? "h-[26px]" : ""}`}>
        <div className={`content-stretch flex items-center relative shrink-0 ${isS || isConversationHistoryAndM || isRenameMyBrainAndM ? "gap-[4px]" : ""}`}>
          {(isS || isConversationHistoryAndM || isRenameMyBrainAndM) && (
            <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Container">
              <div className="flex-[1_0_0] h-[32px] min-w-px relative rounded-[8px]" data-name="IconButton">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7px] relative size-full">
                    <div className="relative shrink-0 size-[18px]" data-name="WidgetHeader">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                        <g id="WidgetHeader">
                          <path d="M11.25 13.5L6.75 9L11.25 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">{state === "Rename My Brain" ? "Rename My Brain" : state === "Conversation History" ? "Conversation History" : state === "Default" && size === "s" ? "Brain" : "Brain"}</p>
        </div>
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
            <OpenInNew className="overflow-clip relative rounded-[999px] shrink-0 size-[24px]" />
            <Setting className="overflow-clip relative rounded-[999px] shrink-0 size-[24px]" />
          </div>
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[16.27%_16.64%_17.01%_16.6%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isS || isConversationHistoryAndM || isRenameMyBrainAndM ? "0 0 16.0224 16.0117" : "0 0 13.352 13.3431"}>
                <path d={isS || isConversationHistoryAndM || isRenameMyBrainAndM ? svgPaths.p90d8a80 : svgPaths.pf799e00} fill={isS || isConversationHistoryAndM || isRenameMyBrainAndM ? "var(--fill-0, black)" : "var(--fill-0, white)"} fillOpacity={state === "Default" && size === "m" ? "0.9" : undefined} id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UploadFilesImageUploadStateEmpty({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#121419] content-stretch flex flex-col h-[830px] items-center justify-between relative rounded-[24px] w-[375px]"} data-name="Upload Files_Image Upload_State_Empty">
      <div aria-hidden className="absolute border border-[rgba(226,208,255,0.79)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <SupportNav className="content-stretch flex flex-col items-start pb-[8px] pt-[16px] px-[16px] relative shrink-0 w-[375px]" />
      <div className="flex-[1_0_0] min-h-px relative w-full">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col items-center px-[16px] relative size-full">
            <div className="content-stretch flex flex-col gap-[12px] items-center pt-[28px] relative shrink-0 w-full" data-name="Hero">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center not-italic relative shrink-0 text-center whitespace-nowrap">
                <p className="bg-clip-text bg-gradient-to-r font-['Poppins:Bold',sans-serif] from-[#dbd3ff] leading-[28px] relative shrink-0 text-[18px] text-[transparent] to-[#e3ff94] to-[145.09%] via-[#76bab2] via-[66.625%]">{`Let's build your trading edge`}</p>
                <p className="font-['Poppins:Medium',sans-serif] leading-[18px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)]">Tell me how you trade.</p>
              </div>
              <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[99px] shrink-0">
                <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#121419] text-[12px] whitespace-nowrap">Get Started</p>
              </div>
            </div>
            <div className="flex-[1_0_0] min-h-px overflow-clip relative w-[343px]" data-name="main section">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(50%+0.5px)] top-[calc(50%+0.5px)]" data-name="ai agent lottie">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[268.8px] top-[calc(50%+0.5px)]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 268.8 268.8">
                    <circle cx="134.4" cy="134.4" id="Ellipse 8161" r="133.9" stroke="url(#paint0_linear_2_708)" strokeOpacity="0.6" />
                    <defs>
                      <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_708" x1="134.4" x2="134.4" y1="0" y2="268.8">
                        <stop stopColor="white" />
                        <stop offset="0.355769" stopColor="#525252" />
                        <stop offset="0.980769" stopColor="white" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[250.047px] top-[calc(50%+0.5px)]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 250.047 250.047">
                    <circle cx="125.023" cy="125.023" id="Ellipse 8162" opacity="0.3" r="124.523" stroke="var(--stroke-0, white)" strokeOpacity="0.3" />
                  </svg>
                </div>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] opacity-60 size-[179.2px] top-[calc(50%+0.5px)]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" height="179.2" src={imgEllipse8163} width="179.2" />
                </div>
                <div className="absolute contents left-[79px] top-[208.17px]" data-name="01">
                  <div className="absolute flex items-center justify-center left-[79px] size-[3.617px] top-[215.41px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[79px] size-[3.617px] top-[219.02px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[79px] size-[3.617px] top-[222.64px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[82.62px] size-[3.617px] top-[211.79px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[86.23px] size-[3.617px] top-[208.17px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[89.85px] size-[3.617px] top-[208.17px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[93.47px] size-[3.617px] top-[211.79px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[97.09px] size-[3.617px] top-[215.41px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[93.47px] size-[3.617px] top-[215.41px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[93.47px] size-[3.617px] top-[219.02px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[93.47px] size-[3.617px] top-[222.64px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[97.09px] size-[3.617px] top-[219.02px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[97.09px] size-[3.617px] top-[222.64px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[93.47px] size-[3.617px] top-[226.26px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[89.85px] size-[3.617px] top-[229.87px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[86.23px] size-[3.617px] top-[229.87px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[82.62px] size-[3.617px] top-[226.26px]">
                    <div className="-scale-y-100 flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                </div>
                <div className="absolute contents left-[246.3px] top-[200.03px]" data-name="03">
                  <div className="absolute flex items-center justify-center left-[264.38px] size-[3.617px] top-[207.27px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[264.38px] size-[3.617px] top-[210.88px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[264.38px] size-[3.617px] top-[214.5px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[260.77px] size-[3.617px] top-[203.65px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[257.15px] size-[3.617px] top-[200.03px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[253.53px] size-[3.617px] top-[200.03px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[249.91px] size-[3.617px] top-[203.65px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[246.3px] size-[3.617px] top-[207.27px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[249.91px] size-[3.617px] top-[207.27px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[249.91px] size-[3.617px] top-[210.88px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[249.91px] size-[3.617px] top-[214.5px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[246.3px] size-[3.617px] top-[210.88px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[246.3px] size-[3.617px] top-[214.5px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[249.91px] size-[3.617px] top-[218.12px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[253.53px] size-[3.617px] top-[221.73px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[257.15px] size-[3.617px] top-[221.73px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[260.77px] size-[3.617px] top-[218.12px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-white relative size-[3.617px]" />
                    </div>
                  </div>
                </div>
                <div className="absolute contents left-[115.18px] top-[172.9px]" data-name="02">
                  <div className="absolute flex items-center justify-center left-[115.18px] size-[3.075px] top-[182.12px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[118.25px] size-[3.075px] top-[182.12px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[121.33px] size-[3.075px] top-[182.12px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[124.4px] size-[3.075px] top-[182.12px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[127.48px] size-[3.075px] top-[182.12px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[121.33px] size-[3.075px] top-[179.05px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[121.33px] size-[3.075px] top-[175.98px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[121.33px] size-[3.075px] top-[172.9px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[124.4px] size-[3.075px] top-[179.05px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[118.25px] size-[3.075px] top-[179.05px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[118.25px] size-[3.075px] top-[185.2px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[121.33px] size-[3.075px] top-[185.2px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[124.4px] size-[3.075px] top-[185.2px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[121.33px] size-[3.075px] top-[188.27px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[121.33px] size-[3.075px] top-[191.35px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[rgba(177,129,255,0.88)] relative size-[3.075px]" />
                    </div>
                  </div>
                </div>
                <div className="absolute contents left-[228.21px] top-[250.67px]" data-name="05">
                  <div className="absolute flex items-center justify-center left-[228.21px] size-[3.075px] top-[259.9px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[231.29px] size-[3.075px] top-[259.9px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[234.36px] size-[3.075px] top-[259.9px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[237.44px] size-[3.075px] top-[259.9px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[240.52px] size-[3.075px] top-[259.9px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[234.36px] size-[3.075px] top-[256.82px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[234.36px] size-[3.075px] top-[253.74px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[234.36px] size-[3.075px] top-[250.67px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[237.44px] size-[3.075px] top-[256.82px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[231.29px] size-[3.075px] top-[256.82px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[231.29px] size-[3.075px] top-[262.97px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[234.36px] size-[3.075px] top-[262.97px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[237.44px] size-[3.075px] top-[262.97px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[234.36px] size-[3.075px] top-[266.05px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[234.36px] size-[3.075px] top-[269.12px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#989898] relative size-[3.075px]" />
                    </div>
                  </div>
                </div>
                <div className="absolute contents inset-[38.68%_37.21%_41.09%_36.95%]">
                  <div className="absolute contents inset-[38.68%_37.21%_41.09%_36.95%]">
                    <div className="absolute inset-[38.68%_37.21%_41.09%_36.95%]" data-name="Vector">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.622 104.594">
                        <path d={svgPaths.p4f7d500} fill="url(#paint0_linear_2_716)" id="Vector" />
                        <defs>
                          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_716" x1="75.1106" x2="42.4342" y1="31.6274" y2="103.744">
                            <stop stopColor="white" stopOpacity="0.8" />
                            <stop offset="1" stopColor="#C6AEFF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="absolute flex inset-[53.65%_49.6%_45%_46.32%] items-center justify-center" style={{ containerType: "size" }}>
                      <div className="flex-none h-[hypot(-1.77769cqw,91.7191cqh)] rotate-[2.4deg] skew-x-[0.16deg] w-[hypot(98.2223cqw,8.2809cqh)]">
                        <div className="relative size-full" data-name="Vector (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7818 6.39234">
                            <path d={svgPaths.p3ba58500} fill="var(--fill-0, black)" id="Vector (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-[51.69%_55.24%_45.95%_39.94%]" data-name="Vector">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5404 12.1955">
                        <path d={svgPaths.p8b3d880} fill="var(--fill-0, white)" id="Vector" />
                      </svg>
                    </div>
                    <div className="absolute inset-[51.69%_54.55%_46.64%_41.83%]" data-name="Vector">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4179 8.63235">
                        <path d={svgPaths.p935e600} fill="var(--fill-0, black)" id="Vector" />
                      </svg>
                    </div>
                    <div className="absolute inset-[51.69%_43.23%_45.95%_51.95%]" data-name="Vector">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5404 12.1955">
                        <path d={svgPaths.p2c9d2980} fill="var(--fill-0, white)" id="Vector" />
                      </svg>
                    </div>
                    <div className="absolute inset-[51.69%_42.55%_46.64%_53.83%]" data-name="Vector">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4179 8.63235">
                        <path d={svgPaths.p20a53200} fill="var(--fill-0, black)" id="Vector" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] opacity-80 size-[310.474px] top-[calc(50%+0.5px)]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" height="310.474" src={imgEllipse8164} width="310.474" />
                </div>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] opacity-50 size-[375.07px] top-[calc(50%+0.5px)]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" height="375.07" src={imgEllipse8165} width="375.07" />
                </div>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] opacity-30 size-[448px] top-[calc(50%+0.5px)]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" height="448" src={imgEllipse8166} width="448" />
                </div>
                <div className="absolute left-[147px] size-[5.209px] top-[82.27px]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2093 5.2093">
                    <circle cx="2.60465" cy="2.60465" fill="var(--fill-0, #DBFD5C)" id="Ellipse 8173" r="2.60465" />
                  </svg>
                </div>
                <div className="absolute left-[267.85px] size-[5.209px] top-[203.12px]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2093 5.2093">
                    <circle cx="2.60465" cy="2.60465" fill="var(--fill-0, white)" fillOpacity="0.8" id="Ellipse 8176" r="2.60465" />
                  </svg>
                </div>
                <div className="absolute left-[275.14px] size-[5.209px] top-[432.33px]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2093 5.2093">
                    <circle cx="2.60465" cy="2.60465" fill="var(--fill-0, white)" fillOpacity="0.8" id="Ellipse 8176" r="2.60465" />
                  </svg>
                </div>
                <div className="absolute left-[82.4px] size-[5.209px] top-[179.16px]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2093 5.2093">
                    <circle cx="2.60465" cy="2.60465" fill="var(--fill-0, white)" fillOpacity="0.8" id="Ellipse 8176" r="2.60465" />
                  </svg>
                </div>
                <div className="absolute left-[286.61px] size-[5.209px] top-[64.55px]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2093 5.2093">
                    <circle cx="2.60465" cy="2.60465" fill="var(--fill-0, white)" fillOpacity="0.8" id="Ellipse 8176" r="2.60465" />
                  </svg>
                </div>
                <div className="absolute left-[18.85px] size-[5.209px] top-[132.27px]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2093 5.2093">
                    <circle cx="2.60465" cy="2.60465" fill="var(--fill-0, white)" fillOpacity="0.8" id="Ellipse 8176" r="2.60465" />
                  </svg>
                </div>
                <div className="absolute bg-[#d9d9d9] left-[111.57px] size-[4.167px] top-[113.52px]" />
                <div className="absolute bg-[#dbfd5c] left-[17.8px] size-[4.167px] top-[187.49px]" />
                <div className="absolute bg-[#dbfd5c] left-[331.41px] size-[4.167px] top-[317.72px]" />
                <div className="absolute bg-[#dbfd5c] left-[214.71px] size-[4.167px] top-[414.61px]" />
                <div className="absolute bg-[#dbfd5c] left-[283px] size-[4.167px] top-[261px]" />
                <div className="absolute bg-[#dbfd5c] left-[63.65px] size-[4.167px] top-[384.4px]" />
              </div>
              <div className="-translate-x-1/2 [word-break:break-word] absolute content-stretch flex flex-col items-center justify-center leading-[18px] left-[calc(50%+0.5px)] not-italic px-[8px] py-[2px] text-[12px] text-center top-[309px] whitespace-nowrap" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 184 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(9.2 0 0 2 92 20)'><stop stop-color='rgba(18,20,25,1)' offset='0'/><stop stop-color='rgba(18,20,25,0)' offset='1'/></radialGradient></defs></svg>\")" }} data-name="info section">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 text-white">{`Hi, I'm`}</p>
                  <p className="bg-clip-text bg-gradient-to-r font-['Poppins:Bold',sans-serif] from-[#dbd3ff] relative shrink-0 text-[transparent] to-[#e3ff94] to-[145.09%] via-[#76bab2] via-[66.625%]">Brain</p>
                </div>
                <p className="font-['Poppins:Medium',sans-serif] relative shrink-0 text-[rgba(255,255,255,0.5)]">Your AI Trading Companion</p>
              </div>
              <QuestionTag className="absolute bg-gradient-to-r content-stretch flex from-[#c6a4ff] items-center left-[29px] overflow-clip px-[10px] py-[4px] rounded-[8px] to-[#dbfd5c] top-[70px]" />
              <QuestionTag className="absolute bg-black left-[154px] rounded-[8px] top-[402px]" color="outline" />
            </div>
          </div>
        </div>
      </div>
      <BottonNavBar className="content-stretch flex flex-col items-center pb-[16px] px-[12px] relative shrink-0 w-[375px]" />
    </div>
  );
}