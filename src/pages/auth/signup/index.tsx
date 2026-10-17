import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { SignupForm } from "@/components/features/auth/signup-form";

export default function SignupPage() {
  return (
    <Card className="rounded-3xl border border-stone-200/90 bg-white/95 p-6 shadow-xl backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/95 sm:p-8">
      <AuthFormHeader
        title="Create an Account"
        description="A little inspiration for your everyday culinary creations."
      />

      <SignupForm />

      <div className="mt-6 text-center text-xs text-stone-500 dark:text-stone-400">
        <span>Already have an account? </span>
        <Link
          className="font-semibold text-amber-700 hover:text-amber-600 dark:text-amber-400 underline underline-offset-4 transition-colors"
          to="/auth/login"
        >
          Sign in
        </Link>
      </div>
    </Card>
  );
}