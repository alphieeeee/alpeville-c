"use client";

import { GalleryCard } from "@/components/gallery-card";
import type { GalleryItem, GalleryMode } from "@/types/gallery";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type GallerySectionProps = {
  items: GalleryItem[];
  mode: GalleryMode;
  title?: string;
};

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous items" : "Next items"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white transition hover:border-[#ad32ff] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span className="text-lg">{direction === "prev" ? "‹" : "›"}</span>
    </button>
  );
}

export function GallerySection({ items, mode, title = "Projects" }: GallerySectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: false,
    slidesToScroll: 2,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 4 },
      "(min-width: 1024px)": { slidesToScroll: 4 },
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || mode !== "slider") return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    requestAnimationFrame(updateButtons);
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, mode, updateButtons]);

  const sliderItems = useMemo(() => items, [items]);

  if (mode === "slider") {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Gallery</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <ArrowButton direction="prev" onClick={() => emblaApi?.scrollPrev()} disabled={!canScrollPrev} />
            <ArrowButton direction="next" onClick={() => emblaApi?.scrollNext()} disabled={!canScrollNext} />
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {sliderItems.map((item) => (
              <div key={item.id} className="min-w-0 flex-[0_0_48%] sm:flex-[0_0_48%] md:flex-[0_0_23%] lg:flex-[0_0_23%]">
                <GalleryCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Gallery</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
        </div>
        <p className="text-sm text-white/50">{items.length} titles</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
