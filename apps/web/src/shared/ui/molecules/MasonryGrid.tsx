import { cn } from "@/shared/lib/cn";

type Columns = 1 | 2 | 3 | 4 | 5 | 6;

type MasonryGridProps = {
  children: React.ReactNode;
  className?: string;
  cols?: {
    base?: Columns;
    sm?: Columns;
    md?: Columns;
    lg?: Columns;
    xl?: Columns;
    "2xl"?: Columns;
  };
};

const BASE: Record<Columns, string> = {
  1: "columns-1",
  2: "columns-2",
  3: "columns-3",
  4: "columns-4",
  5: "columns-5",
  6: "columns-6",
} as const;

const SM: Record<Columns, string> = {
  1: "sm:columns-1",
  2: "sm:columns-2",
  3: "sm:columns-3",
  4: "sm:columns-4",
  5: "sm:columns-5",
  6: "sm:columns-6",
} as const;

const MD: Record<Columns, string> = {
  1: "md:columns-1",
  2: "md:columns-2",
  3: "md:columns-3",
  4: "md:columns-4",
  5: "md:columns-5",
  6: "md:columns-6",
} as const;

const LG: Record<Columns, string> = {
  1: "lg:columns-1",
  2: "lg:columns-2",
  3: "lg:columns-3",
  4: "lg:columns-4",
  5: "lg:columns-5",
  6: "lg:columns-6",
} as const;

const XL: Record<Columns, string> = {
  1: "xl:columns-1",
  2: "xl:columns-2",
  3: "xl:columns-3",
  4: "xl:columns-4",
  5: "xl:columns-5",
  6: "xl:columns-6",
} as const;

const XXL: Record<Columns, string> = {
  1: "2xl:columns-1",
  2: "2xl:columns-2",
  3: "2xl:columns-3",
  4: "2xl:columns-4",
  5: "2xl:columns-5",
  6: "2xl:columns-6",
} as const;

const MasonryGridRoot: React.FC<MasonryGridProps> = ({
  children,
  className,
  cols = { base: 1, sm: 2, md: 3, lg: 4 },
}) => {
  const classes = cn(
    "w-full gap-1",
    BASE[cols.base ?? 1],
    cols.sm && SM[cols.sm],
    cols.md && MD[cols.md],
    cols.lg && LG[cols.lg],
    cols.xl && XL[cols.xl],
    cols["2xl"] && XXL[cols["2xl"]],
    className
  );

  return <div className={classes}>{children}</div>;
};

type MasonryItemProps = {
  children: React.ReactNode;
  className?: string;
};

const MasonryItem = ({ children, className }: MasonryItemProps) => (
  <div className={cn("break-inside-avoid mb-1", className)}>{children}</div>
);

export const MasonryGrid = Object.assign(MasonryGridRoot, {
  Item: MasonryItem,
});
