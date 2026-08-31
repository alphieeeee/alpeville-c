"use client";

import { usePathname } from "next/navigation";
import Animated3DChar from "./Animated3DChar";

export default function RouteAnimated3DChar() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return <Animated3DChar />;
}
