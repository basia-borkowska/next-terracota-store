import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import i18n from "@/../i18n"; // import from project root

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = await params.locale;
  if (!i18n.locales.includes(locale)) notFound();

  // Load messages for the current locale
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
