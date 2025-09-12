import "./globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
  lang?: string;
};

export default function RootLayout({ children, lang = "en" }: RootLayoutProps) {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
