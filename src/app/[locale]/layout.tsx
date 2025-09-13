import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import i18n from "@/../i18n";
import Navbar from "@/widgets/navbar/Navbar";
import { LocaleParams } from "@/shared/lib/types";

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const { locale } = await params;
  if (!i18n.locales.includes(locale)) notFound();

  // Load messages for the current locale
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      {children}
    </NextIntlClientProvider>
  );
}
