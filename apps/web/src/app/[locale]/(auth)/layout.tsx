import Image from "next/image";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh grid place-items-center bg-light p-4">
      <div className="flex flex-col gap-10 w-full max-w-lg rounded-2xl border border-white/15 p-6 shadow-2xl">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={96}
          height={24}
          className="h-8 w-auto"
        />
        {children}
      </div>
    </div>
  );
}
