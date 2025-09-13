"use client";

import { cn } from "@/shared/lib/cn";
import { ImageWithFallback } from "@/shared/ui/molecules/ImageWithFallback";

interface GalleryProps {
  images: string[];
  className?: string;
}

export function Gallery({ images, className }: GalleryProps) {
  if (!images.length) return null;

  // Split images into rows of 2, 3, 2, 3, ...
  const rows: string[][] = [];
  let i = 0;
  const pattern = [2, 3];
  let patternIdx = 0;

  while (i < images.length) {
    const count = pattern[patternIdx % pattern.length];
    rows.push(images.slice(i, i + count));
    i += count;
    patternIdx++;
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1">
          {row.map((src, colIdx) => {
            const isLastRow = rowIdx === rows.length - 1;
            const height = isLastRow
              ? "h-[700px]"
              : row.length === 2
              ? "h-[600px]"
              : "h-56";

            return (
              <div key={colIdx} className={cn("flex-1", height)}>
                <ImageWithFallback
                  src={src}
                  alt={`Gallery image ${rowIdx * 3 + colIdx + 1}`}
                  className="w-full h-full object-cover"
                  priority={rowIdx === 0}
                  fill
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
