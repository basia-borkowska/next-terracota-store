import { Title } from "@/shared/ui/atoms/typography/Title";
import { Subtitle } from "@/shared/ui/atoms/typography/Subtitle";
import LoginForm from "@/shared/ui/organisms/LoginForm";
import { pathnames, withLocale } from "@/shared/lib/pathnames";
import { HelperText } from "@/shared/ui/atoms/typography/HelperText";
import { getTranslations } from "next-intl/server";
import { LocaleParams } from "@/shared/lib/types";
import Link from "next/link";

export default async function LoginPage({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <>
      <div className="flex flex-col gap-3">
        <Title>{t("auth.signIn")}</Title>
        <Subtitle>{t("auth.signInMessage")}</Subtitle>
      </div>
      <LoginForm />
      <HelperText className="flex gap-1">
        <span>{t("auth.noAccount")}</span>
        <Link
          href={withLocale(locale, pathnames.register)}
          className="underline"
        >
          {t("auth.register")}
        </Link>
      </HelperText>
    </>
  );
}
