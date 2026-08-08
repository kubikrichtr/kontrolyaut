import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "kontrolyaut_sticky_cta_dismissed";

export function MobileStickyCta() {
  const [dismissed, setDismissed] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    setDismissed(stored === "1");
  }, []);

  useEffect(() => {
    const target = document.getElementById("kontakt");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (dismissed || hidden) return null;

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur pb-safe">
      <div className="container-page flex items-center gap-3 py-3">
        <a href="/#kontakt" className="btn-primary flex-1 justify-center">
          Objednat kontrolu
        </a>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(STORAGE_KEY, "1");
            setDismissed(true);
          }}
          aria-label="Skrýt lištu"
          className="tap-target flex items-center justify-center rounded-full border border-border text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
