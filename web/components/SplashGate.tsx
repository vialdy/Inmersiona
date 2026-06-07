"use client";

import { useState, useEffect } from "react";
import { SplashIntro } from "./SplashIntro";

const SESSION_KEY = "inmersiona_intro_seen";

export function SplashGate({ children }: { children: React.ReactNode }) {
  // Start with null to avoid hydration mismatch — we don't know sessionStorage on server
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSplash(false);
    } else {
      setShowSplash(true);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowSplash(false);
  };

  // While checking sessionStorage, render children but hide them briefly
  // This avoids a blank flash
  if (showSplash === null) {
    return (
      <>
        <div className="fixed inset-0 z-[9999] bg-black" />
        {children}
      </>
    );
  }

  return (
    <>
      {showSplash && <SplashIntro onComplete={handleComplete} />}
      {children}
    </>
  );
}
