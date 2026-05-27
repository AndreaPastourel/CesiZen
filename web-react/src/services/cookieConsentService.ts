export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  preferences: boolean;
};

const COOKIE_CONSENT_KEY = "cookieConsent";

export function getCookieConsent(): CookieConsent | null {
  const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

  if (!storedConsent) {
    return null;
  }

  try {
    return JSON.parse(storedConsent) as CookieConsent;
  } catch {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    return null;
  }
}

export function saveCookieConsent(consent: CookieConsent) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
}

export function acceptAllCookies() {
  saveCookieConsent({
    necessary: true,
    analytics: true,
    preferences: true,
  });
}

export function refuseOptionalCookies() {
  saveCookieConsent({
    necessary: true,
    analytics: false,
    preferences: false,
  });
}

export function clearCookieConsent() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}