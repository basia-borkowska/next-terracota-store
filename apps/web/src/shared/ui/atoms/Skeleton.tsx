"use client";

import { cn } from "@/shared/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-gray-200/80",
        "relative overflow-hidden",
        className
      )}
      {...rest}
    />
  );
}
