import { cn } from "@/shared/lib/cn";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: PageWrapperProps) => (
  <div
    className={cn(
      "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 lg:py-6",
      className
    )}
  >
    {children}
  </div>
);
