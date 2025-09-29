import Loader from "@/shared/ui/atoms/Loader";
import { cn } from "@/shared/lib/cn";

type Props = {
  className?: string;
  respectNavbar?: boolean;
};

export default function FullPageLoader({
  className,
  respectNavbar = true,
}: Props) {
  return (
    <div
      className={cn(
        "w-full",
        respectNavbar
          ? "min-h-[calc(100vh-var(--navbar-height,56px))]"
          : "min-h-screen",
        "grid place-items-center px-6",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3 text-gray-600">
        <Loader size={40} stroke={3} />
      </div>
    </div>
  );
}
