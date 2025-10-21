"use client";

import { pathnames } from "@/shared/lib/pathnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/shared/ui/atoms/Field";
import { Button } from "@/shared/ui/atoms/Button";
import { HelperText } from "@/shared/ui/atoms/typography/HelperText";
import { authRegister } from "@/shared/lib/api/auth";
import { useTranslations } from "next-intl";

const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});
type RegisterInput = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onSubmit",
  });

  const onSubmit = async ({ email, password, name }: RegisterInput) => {
    setServerError(null);
    try {
      await authRegister({ email, password, name });
      window.location.href = pathnames.home;
    } catch (error) {
      setServerError(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <Input
        label={t("auth.name")}
        type="text"
        placeholder="John Doe"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label={t("auth.email")}
        type="email"
        placeholder="email@example.com"
        {...register("email")}
        error={errors.email?.message}
      />

      {/* TODO add repeat password */}
      <Input
        label={t("auth.password")}
        type="password"
        placeholder="********"
        {...register("password")}
        error={errors.password?.message}
      />

      {serverError && (
        <HelperText className="text-accent-highlight">{serverError}</HelperText>
      )}
      <Button loading={isSubmitting} disabled={isSubmitting}>
        {t("auth.register")}
      </Button>
    </form>
  );
}
