import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

const ENDPOINT =
  "https://ajafqafoonxoubbhcxnk.supabase.co/functions/v1/track-page-view";

/**
 * Fire-and-forget page-view tracking (no auth header).
 * Skips /admin and /login paths.
 */
export function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/admin") || path.startsWith("/login")) return;

    let sessionId = sessionStorage.getItem("pv_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("pv_session_id", sessionId);
    }

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site: "kontrolyaut",
        path,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent.slice(0, 500),
        session_id: sessionId,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [location.pathname]);

  return null;
}
