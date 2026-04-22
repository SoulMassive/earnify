import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--dark-bg)] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--primary)]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-8xl font-black text-white mb-4 font-[family-name:var(--font-jetbrains)] tracking-tighter">
          404
        </div>
        
        <h2 className="text-3xl font-bold font-[family-name:var(--font-syne)] text-white mb-4">
          Lost in the Workspace?
        </h2>
        
        <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed">
          The page you are looking for has been moved or doesn't exist. Let's get you back to earning.
        </p>
        
        <a
          href="/"
          className="btn-cta-gradient inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-[var(--primary)]/20 active:scale-95 transition-all"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
}
