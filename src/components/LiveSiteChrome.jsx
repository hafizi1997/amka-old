import { useEffect, useState } from "react";

export default function LiveSiteChrome() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, ratio)));
      setShowTop(window.scrollY > 480);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: `${progress}%`,
          background: "linear-gradient(90deg, #1D806B 0%, #246180 65%, #C4993D 100%)",
          zIndex: 130,
          transition: "width 120ms linear",
        }}
      />

      <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 120, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
        {showTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(12,17,23,0.86)",
              color: "#E8EDF3",
              borderRadius: 999,
              width: 38,
              height: 38,
              fontSize: 16,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
            }}
            aria-label="Back to top"
          >
            ↑
          </button>
        )}
      </div>
    </>
  );
}
