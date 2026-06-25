export const DEFAULT_AGENT_NAME = "Trader DNA";
export const PORTFOLIO_DISPLAY_NAME = "Trade DNA";
export const AGENT_NAME_STORAGE_KEY = "trader-dna-agent-name";
export const AGENT_NAME_CHANGE_EVENT = "trader-dna-name-change";

export function loadSavedAgentName(): string {
  try {
    const saved = localStorage.getItem(AGENT_NAME_STORAGE_KEY);
    return saved?.trim() ? saved.trim() : DEFAULT_AGENT_NAME;
  } catch {
    return DEFAULT_AGENT_NAME;
  }
}

export function loadCustomAgentName(): string | null {
  try {
    const saved = localStorage.getItem(AGENT_NAME_STORAGE_KEY);
    return saved?.trim() ? saved.trim() : null;
  } catch {
    return null;
  }
}

export function getPortfolioTalkToName(): string {
  return loadCustomAgentName() ?? PORTFOLIO_DISPLAY_NAME;
}

export function persistAgentName(name: string) {
  try {
    if (name === DEFAULT_AGENT_NAME) {
      localStorage.removeItem(AGENT_NAME_STORAGE_KEY);
    } else {
      localStorage.setItem(AGENT_NAME_STORAGE_KEY, name);
    }
    window.dispatchEvent(new CustomEvent(AGENT_NAME_CHANGE_EVENT));
  } catch {
    // Ignore storage errors in prototype mode.
  }
}
