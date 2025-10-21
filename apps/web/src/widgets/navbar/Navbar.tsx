"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Columns3 as Columns,
  LogOut,
  User,
} from "lucide-react";
import NavbarLink from "./NavbarLink";
import NavbarLanguageSwitch from "./NavbarLanguageSwitch";
import { useScrollY } from "@/shared/hooks/useScrollY";
import { pathnames, withLocale } from "@/shared/lib/pathnames";
import { Me } from "@terracota/types";

const Y_SCROLL_THRESHOLD = 24;

const Navbar = ({ user }: { user: Me | null }) => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const y = useScrollY();

  const transparentNavbar = useMemo(
    () => y <= Y_SCROLL_THRESHOLD && pathname === `/${locale}`,
    [y, pathname, locale]
  );

  return (
    <nav
      data-transparent={transparentNavbar ? "true" : "false"}
      className="group/nav sticky top-0 left-0 z-50 flex h-[56px] w-full items-center justify-between px-8 py-4 transition-colors duration-700
                 data-[transparent=true]:bg-transparent data-[transparent=false]:bg-white"
    >
      <Link href={`/${locale}`} className="inline-flex items-center">
        <Image
          src="/images/logo.svg"
          alt="Terracota logo"
          width={96}
          height={24}
          className="h-6 w-auto"
          priority
        />
      </Link>

      <div className="absolute left-1/2 -translate-x-1/2 hidden gap-10 md:flex">
        <NavbarLink href={withLocale(locale, pathnames.newProducts)}>
          {t("navbar.newIn")}
        </NavbarLink>
        <NavbarLink href={withLocale(locale, pathnames.products)}>
          {t("common.products")}
        </NavbarLink>
        <NavbarLink href={withLocale(locale, pathnames.inspirations)}>
          {t("navbar.inspirations")}
        </NavbarLink>
      </div>

      <div className="flex items-center gap-4">
        <NavbarLink href={withLocale(locale, pathnames.compare)}>
          <Columns className="size-5" />
        </NavbarLink>

        <NavbarLink href={withLocale(locale, pathnames.wishList)}>
          <Heart className="size-5" />
        </NavbarLink>

        <NavbarLink href={withLocale(locale, pathnames.checkout.root)}>
          <ShoppingCart className="size-5" />
        </NavbarLink>

        <NavbarLanguageSwitch />
        {user ? (
          <NavbarLink href={withLocale(locale, pathnames.logout)}>
            <LogOut className="size-5" />
          </NavbarLink>
        ) : (
          <NavbarLink href={withLocale(locale, pathnames.login)}>
            <User className="size-5" />
          </NavbarLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
