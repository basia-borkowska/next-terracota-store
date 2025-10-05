"use client";

import { pathnames } from "@/shared/lib/pathnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/shared/ui/atoms/Field";
import { Button } from "@/shared/ui/atoms/Button";
import { HelperText } from "@/shared/ui/atoms/typography/HelperText";
import { authLogin } from "@/shared/lib/api/auth";
import { useServerError } from "@/shared/hooks/useServerError";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginInput = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const { serverError, fieldErrors, handleError, clearError } =
    useServerError();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async ({ email, password }: LoginInput) => {
    clearError();
    try {
      await authLogin({ email, password });
      window.location.href = pathnames.home;
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        {...register("email")}
        error={errors.email?.message || fieldErrors.email}
      />

      <Input
        label="Password"
        type="password"
        placeholder="********"
        {...register("password")}
        error={errors.password?.message || fieldErrors.password}
      />

      {serverError && (
        <HelperText className="text-accent-highlight">{serverError}</HelperText>
      )}
      <Button loading={isSubmitting} disabled={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
}
