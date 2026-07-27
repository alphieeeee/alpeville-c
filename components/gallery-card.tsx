import Image from "next/image";
import Link from "next/link";
import type { GalleryItem } from "@/types/gallery";

type GalleryCardProps = {
  item: GalleryItem;
};

export function GalleryCard({ item }: GalleryCardProps) {
  return (
    <Link
      href={`/projects/${item.slug}`}
      className="group relative block snap-start overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
    >
      <div className="relative aspect-[2/3]">
        <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-base font-semibold text-white">{item.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/60">{item.category}</p>
        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-white/70 transition-all duration-300 group-hover:max-h-20">
          {item.summary}
        </p>
      </div>
    </Link>
  );
}
