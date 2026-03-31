"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background: "#f1f5e2",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1c2b2c", margin: 0 }}>
        Something went wrong
      </h2>
      <p style={{ color: "#5a7a7b", fontSize: "15px", margin: 0 }}>
        {error?.message || "An unexpected error occurred."}
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={reset}
          style={{
            background: "linear-gradient(135deg, #6d9c9f, #4a8b8e)",
            color: "#fff",
            border: "none",
            borderRadius: "100px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            border: "1.5px solid #6d9c9f",
            borderRadius: "100px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#6d9c9f",
            textDecoration: "none",
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
