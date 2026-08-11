// Browsers auto-scroll the parent page to bring a newly-focused iframe fully
// into view (long-standing, cross-browser behavior — see
// https://bugzilla.mozilla.org/show_bug.cgi?id=638598). Since every demo
// preview on this site is an embedded iframe, clicking anything inside one
// hijacks the whole page's scroll position the moment focus moves in.
//
// Fix: the instant focus moves into any iframe, make the page physically
// unable to scroll for a short window (overflow: hidden + position: fixed
// on body), so the browser's own scroll-into-view attempt is a no-op —
// regardless of its exact timing or whether it's animated by
// scroll-behavior: smooth. This is a single shared lock so multiple
// independent triggers (an iframe's own onFocus, and a page-wide fallback
// for any iframe added outside our control) can't race or double-manage
// document.body's inline styles.
let locked = false;
let lockedScrollY = 0;
let unlockTimer: number | undefined;

function unlock() {
  if (!locked) return;
  locked = false;
  document.documentElement.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  window.scrollTo(0, lockedScrollY);
}

/** Lock the page's scroll position. Safe to call repeatedly — refreshes the auto-unlock timer. */
export function lockPageScroll(durationMs = 600) {
  if (typeof window === "undefined") return;
  if (!locked) {
    locked = true;
    lockedScrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
  }
  window.clearTimeout(unlockTimer);
  unlockTimer = window.setTimeout(unlock, durationMs);
}

/** Call on unmount of whatever installed the fallback listeners, to release an in-progress lock. */
export function releasePageScrollLock() {
  window.clearTimeout(unlockTimer);
  unlock();
}
