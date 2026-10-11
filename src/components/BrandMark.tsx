// AnimatedWebs UI brand: the AnimatedWebs iridescent ring plus a text wordmark.
export function BrandMark({ compact = false }: { compact?: boolean }) {
  const gradId = compact ? "aw-ring-compact" : "aw-ring";

  return (
    <span className={compact ? "topbar-brand" : "logo"}>
      <span className="brand-symbol">
        <svg className="brand-mark" viewBox="0 0 512 512" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7c5cff" />
              <stop offset=".5" stopColor="#22c5ff" />
              <stop offset="1" stopColor="#ff5fcf" />
            </linearGradient>
          </defs>
          <circle cx="256" cy="256" r="168" fill="none" stroke={`url(#${gradId})`} strokeWidth="64" />
        </svg>
      </span>
      <span className="brand-wordmark-text" style={{ fontWeight: 600, letterSpacing: "-0.02em", fontSize: compact ? 15 : 17, whiteSpace: "nowrap" }}>
        AnimatedWebs{" "}
        <span style={{ marginLeft: 4, padding: "2px 6px", borderRadius: 6, background: "#c6ff3d", color: "#0a0b0a", fontSize: compact ? 10 : 11, fontWeight: 700, letterSpacing: "0.04em", verticalAlign: "middle" }}>UI</span>
      </span>
    </span>
  );
}
