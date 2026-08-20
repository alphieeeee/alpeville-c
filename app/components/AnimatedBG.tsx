"use client";

export default function AnimatedBG() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,118,201,0.28),transparent_35%),radial-gradient(circle_at_top_right,rgba(46,202,237,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />
      <div className="absolute left-[10%] top-[12%] h-72 w-72 rounded-full bg-secondary/15 blur-3xl animate-pulse" />
      <div className="absolute right-[8%] top-[20%] h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-pulse [animation-delay:1.2s]" />
      <div className="absolute bottom-[10%] left-[22%] h-80 w-80 rounded-full bg-white/5 blur-3xl animate-pulse [animation-delay:2.1s]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
    </div>
  );
}
