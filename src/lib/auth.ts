// NOTE: Single-admin auth for `/console` (not linked on the public site). Change this password.
// Stored in code by design (per project owner's request).
export const ADMIN_PASSWORD = "zeteo-admin-2025";

const KEY = "zeteo:admin:session";

export const adminAuth = {
  isAuthed(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(KEY) === "1";
  },
  login(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(KEY, "1");
      return true;
    }
    return false;
  },
  logout() {
    localStorage.removeItem(KEY);
  },
};
