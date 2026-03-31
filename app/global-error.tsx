"use client";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ margin: 0, display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", fontFamily: "system-ui", background: "#f1f5e2", color: "#1c2b2c" }}>
        <h2 style={{ margin: 0, fontSize: "22px" }}>Something went wrong</h2>
        <button onClick={reset} style={{ background: "#6d9c9f", color: "#fff", border: "none", borderRadius: "100px", padding: "12px 28px", cursor: "pointer", fontSize: "15px" }}>
          Try Again
        </button>
      </body>
    </html>
  );
}
