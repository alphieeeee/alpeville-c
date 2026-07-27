"use client";

import { useEffect, useState } from "react";

export function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 rounded-full border border-[#ad32ff]/40 bg-black/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-lg shadow-[#ad32ff]/10 backdrop-blur"
    >
      Top
    </button>
  );
}
