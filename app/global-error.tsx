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
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
          fontFamily: "system-ui, sans-serif",
          background: "#f1f5e2",
          color: "#1c2b2c",
        }}
      >
        <div style={{ fontSize: "48px", fontWeight: 800 }}>Earnify</div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>
          Something went wrong
        </h2>
        <p style={{ color: "#5a7a7b", fontSize: "15px", margin: 0 }}>
          {error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          style={{
            background: "linear-gradient(135deg, #6d9c9f, #4a8b8e)",
            color: "#fff",
            border: "none",
            borderRadius: "100px",
            padding: "12px 28px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
