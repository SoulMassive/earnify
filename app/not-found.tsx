import React from "react";

export default function NotFound() {
  return (
    <html lang="en">
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
        <div style={{ fontSize: "72px", fontWeight: 800, color: "#6d9c9f" }}>
          404
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>
          Page Not Found
        </h2>
        <p style={{ color: "#5a7a7b", fontSize: "15px", margin: 0 }}>
          The page you are looking for doesn&apos;t exist.
        </p>
        <a
          href="/"
          style={{
            background: "linear-gradient(135deg, #6d9c9f, #4a8b8e)",
            color: "#fff",
            border: "none",
            borderRadius: "100px",
            padding: "12px 28px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Go Home
        </a>
      </body>
    </html>
  );
}
