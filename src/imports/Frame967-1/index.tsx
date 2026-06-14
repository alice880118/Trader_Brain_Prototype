import svgPaths from "./svg-eqdekilfjt";

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-px h-[40px] items-start min-w-px relative">
      <div className="flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-[min-content]">
        <p className="leading-[18px]">Price</p>
      </div>
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">105,420</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[4px] h-[20px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 w-[51px]" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">
        <p className="leading-[14px]">BBO</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Button />
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c9bdff] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Mid</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[40px] items-center relative shrink-0 w-[80px]">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-right w-full">
        <p className="leading-[18px]">USDC</p>
      </div>
      <Frame />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[6px] shrink-0 w-full">
      <div className="content-stretch flex items-start px-[12px] py-[8px] relative size-full">
        <Frame2 />
        <Frame1 />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
        <p className="leading-[18px]">Qty</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex h-[19px] items-center relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="[word-break:break-word] content-stretch flex items-center relative shrink-0 w-full">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">0.08</p>
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[12px] text-[rgba(255,255,255,0.5)] text-right">
        <p className="leading-[18px]">ETH</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] flex-[1_0_0] min-w-px relative rounded-[6px]">
      <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative size-full">
        <Frame6 />
        <Frame12 />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[12px] relative shrink-0 w-[6.999px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.99927 12">
        <g id="Frame 1912056903">
          <path clipRule="evenodd" d={svgPaths.p34227e90} fill="var(--fill-0, white)" fillOpacity="0.5" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
        <p className="font-['Poppins:SemiBold',sans-serif] not-italic">
          <span className="leading-[18px]">Order size</span>
          <span className="leading-[18px]">≈</span>
        </p>
      </div>
      <Frame11 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame5 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="[word-break:break-word] content-stretch flex items-start justify-between relative shrink-0 w-full whitespace-nowrap">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.9)]">8,433</p>
      <div className="flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-right">
        <p className="leading-[18px]">USDC</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex flex-col items-center px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[146px]">
      <Frame14 />
      <Frame13 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <Frame8 />
      <Frame7 />
    </div>
  );
}

export default function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative size-full">
      <Frame3 />
      <Frame9 />
    </div>
  );
}