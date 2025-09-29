"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import NavbarLink from "./NavbarLink";

const NavbarLanguageSwitch = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "en" ? "pl" : "en";

  const href = (() => {
    const parts = pathname.split("/");
    if (parts.length > 1) {
      parts[1] = nextLocale;
    }
    return parts.join("/") || `/${nextLocale}`;
  })();

  return <NavbarLink href={href}>{nextLocale.toUpperCase()}</NavbarLink>;
};

export default NavbarLanguageSwitch;
