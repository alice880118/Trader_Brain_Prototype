function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[24px] items-center min-w-px relative">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] tracking-[-0.36px] whitespace-nowrap" style={{ fontFeatureSettings: '"lnum", "tnum"' }}>
        <p className="leading-[12px]">Quantity</p>
      </div>
    </div>
  );
}

function ButtonXs() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="button-xs">
      <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-right tracking-[-0.36px] whitespace-nowrap" style={{ fontFeatureSettings: '"lnum", "tnum"' }}>
        Entire position
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] flex-[1_0_0] min-w-px relative rounded-[6px]">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[4px] relative size-full">
          <Frame2 />
          <ButtonXs />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center min-h-[24px] px-[8px] relative rounded-[4px] self-stretch shrink-0 w-[62px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#6e55df] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] min-h-[24px] not-italic relative shrink-0 text-[#c9bdff] text-[12px] text-center tracking-[-0.36px] whitespace-nowrap" style={{ fontFeatureSettings: '"lnum", "tnum"' }}>
        <p className="leading-[12px]">Position</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Frame8 />
      <Button />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[rgba(110,85,223,0.15)] content-stretch flex h-[28px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 w-[73px]">
      <div aria-hidden className="absolute border border-[rgba(110,85,223,0.9)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] min-h-[24px] not-italic relative shrink-0 text-[#c2b4ff] text-[12px] text-center tracking-[-0.36px] whitespace-nowrap" style={{ fontFeatureSettings: '"lnum", "tnum"' }}>
        <p className="leading-[12px]">100%</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[4px] h-[28px] items-center justify-center min-h-[24px] px-[8px] relative rounded-[4px] shrink-0 w-[73px]" data-name="Button">
        <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] min-h-[24px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] text-center tracking-[-0.36px] whitespace-nowrap" style={{ fontFeatureSettings: '"lnum", "tnum"' }}>
          <p className="leading-[12px]">25%</p>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[4px] h-[28px] items-center justify-center min-h-[24px] px-[8px] relative rounded-[4px] shrink-0 w-[73px]" data-name="Button">
        <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] min-h-[24px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] text-center tracking-[-0.36px] whitespace-nowrap" style={{ fontFeatureSettings: '"lnum", "tnum"' }}>
          <p className="leading-[12px]">50%</p>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex gap-[4px] h-[28px] items-center justify-center min-h-[24px] px-[8px] relative rounded-[4px] shrink-0 w-[73px]" data-name="Button">
        <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] min-h-[24px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] text-center tracking-[-0.36px] whitespace-nowrap" style={{ fontFeatureSettings: '"lnum", "tnum"' }}>
          <p className="leading-[12px]">75%</p>
        </div>
      </div>
      <Frame9 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start justify-center relative shrink-0 w-full">
      <Frame12 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#6e55df] h-[2px] left-0 right-px rounded-[999px] top-[3px]" data-name="Horizontal Divider" />
      <div className="absolute left-[304px] size-[8px] top-0">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #0C0D10)" id="Ellipse 4" r="3.5" stroke="var(--stroke-0, #6E55DF)" />
        </svg>
      </div>
      <div className="absolute left-[76px] size-[6px] top-px">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #131519)" id="Ellipse 5" r="2.5" stroke="var(--stroke-0, #6E55DF)" />
        </svg>
      </div>
      <div className="absolute left-[152px] size-[6px] top-px">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #131519)" id="Ellipse 5" r="2.5" stroke="var(--stroke-0, #6E55DF)" />
        </svg>
      </div>
      <div className="absolute left-[228px] size-[6px] top-px">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #131519)" id="Ellipse 5" r="2.5" stroke="var(--stroke-0, #6E55DF)" />
        </svg>
      </div>
      <div className="absolute left-0 size-[6px] top-px">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #6E55DF)" id="Ellipse 8" r="2.5" stroke="var(--stroke-0, #6E55DF)" />
        </svg>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[8px] relative shrink-0 w-full">
      <Group />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col justify-center relative shrink-0 text-[#bcadff]">
        <p className="leading-[18px]">Max</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.83)]">
        <p className="leading-[18px]">0.08</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Poppins:SemiBold',sans-serif] items-center justify-between leading-[0] not-italic relative shrink-0 text-[12px] w-full whitespace-nowrap">
      <div className="flex flex-col justify-center relative shrink-0 text-[#bcadff]">
        <p className="leading-[18px]">100%</p>
      </div>
      <Frame4 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame6 />
      <Frame5 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-[24px] items-center mr-[-10.011px] relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.9)] tracking-[-0.39px] w-[252px]" style={{ fontFeatureSettings: '"lnum", "tnum"' }}>
        <p className="leading-[13px]">0.08</p>
      </div>
    </div>
  );
}

function ButtonXs1() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="button-xs">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.5)] text-right whitespace-nowrap">Market</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[6px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[4px] relative size-full">
          <Frame3 />
          <ButtonXs1 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">
        <p className="leading-[20px]">Cancel</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Confirm</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <div className="flex-[1_0_0] h-[32px] min-w-px relative rounded-[999px]" data-name="Button">
        <div aria-hidden className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[999px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[24px] relative size-full">
            <Frame />
          </div>
        </div>
      </div>
      <div className="bg-[#6e55df] flex-[1_0_0] h-[32px] min-w-px relative rounded-[999px]" data-name="Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[24px] relative size-full">
            <Frame1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame15 />
      <Frame13 />
      <Frame7 />
      <Frame10 />
      <Frame11 />
    </div>
  );
}

export default function Settings() {
  return (
    <div className="bg-[#0c0d10] content-stretch flex flex-col items-start p-[20px] relative rounded-[4px] size-full" data-name="Settings">
      <div aria-hidden className="absolute border border-[rgba(110,85,223,0.85)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame14 />
    </div>
  );
}