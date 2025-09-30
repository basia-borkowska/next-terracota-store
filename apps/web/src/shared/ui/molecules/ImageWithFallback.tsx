"use client";

import { cn } from "@/shared/lib/cn";
import NextImage, { ImageProps } from "next/image";
import { useState } from "react";
import imageFallback from "/public/images/image-fallback.svg";

type Props = ImageProps & {
  className?: string;
};

export const ImageWithFallback = ({ src, alt, className, ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={cn("relative", className)}
      style={{ width: props.width, height: props.height }}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 shadow-md" />
      )}

      <NextImage
        {...props}
        src={error ? imageFallback : src}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-opacity duration-300",
          { "opacity-100": loaded },
          { "opacity-0": !loaded }
        )}
      />
    </div>
  );
};
