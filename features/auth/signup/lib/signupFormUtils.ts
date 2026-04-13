export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidExternalLink(link: string) {
  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isReloadNavigation() {
  if (typeof window === "undefined") return false;

  const navigationEntry = window.performance
    .getEntriesByType("navigation")
    .at(0) as PerformanceNavigationTiming | undefined;

  const legacyNavigation = (
    window.performance as Performance & {
      navigation?: { type?: number };
    }
  ).navigation;

  const isReload =
    navigationEntry?.type === "reload" || legacyNavigation?.type === 1;

  if (!isReload || !document.referrer) return false;

  try {
    const referrerUrl = new URL(document.referrer);
    return (
      referrerUrl.pathname === window.location.pathname &&
      referrerUrl.search === window.location.search
    );
  } catch {
    return false;
  }
}
