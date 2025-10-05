import { Title } from "@/shared/ui/atoms/typography/Title";
import { Subtitle } from "@/shared/ui/atoms/typography/Subtitle";
import { pathnames, withLocale } from "@/shared/lib/pathnames";
import { HelperText } from "@/shared/ui/atoms/typography/HelperText";
import { getTranslations } from "next-intl/server";
import RegisterForm from "@/shared/ui/organisms/RegisterForm";
import { LocaleParams } from "@/shared/lib/types";
import Link from "next/link";

export default async function RegisterPage({
  params,
}: {
  params: LocaleParams;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <>
      <div className="flex flex-col gap-3">
        <Title>{t("auth.register")}</Title>
        <Subtitle>{t("auth.registerMessage")}</Subtitle>
      </div>
      <RegisterForm />
      <HelperText className="flex gap-1">
        <span>{t("auth.haveAccount")}</span>
        <Link href={withLocale(locale, pathnames.login)} className="underline">
          {t("auth.signIn")}
        </Link>
      </HelperText>
    </>
  );
}
