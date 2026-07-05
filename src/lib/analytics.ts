export const GA_MEASUREMENT_ID = "G-1TJEDCC8QN";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string) {
  window.gtag?.("config", GA_MEASUREMENT_ID, { page_path: path });
}
