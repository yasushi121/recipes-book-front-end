import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/features/auth/login-form";

export default function LoginPage() {
  return (
    <Card className="rounded-3xl border border-stone-200/90 bg-white/95 p-6 shadow-xl backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/95 sm:p-8">
      <AuthFormHeader
        title="Welcome Back"
        description="Sign in to access your saved recipes and kitchen journal."
      />

      <LoginForm />

      <div className="mt-6 text-center text-xs text-stone-500 dark:text-stone-400">
        <span>New here? </span>
        <Link
          className="font-semibold text-amber-700 hover:text-amber-600 dark:text-amber-400 underline underline-offset-4 transition-colors"
          to="/auth/signup"
        >
          Create an account
        </Link>
      </div>
    </Card>
  );
}
