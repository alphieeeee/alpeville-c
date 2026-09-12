"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Static3DBG from "./Static3DBG";

const Animated3DBG = dynamic(() => import("./Animated3DBG"), { ssr: false });

export default function Responsive3DBG() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (isMobile === null || isMobile) return <Static3DBG />;

  return <Animated3DBG />;
}
