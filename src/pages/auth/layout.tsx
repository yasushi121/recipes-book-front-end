import { AuthHeader } from "@/components/features/auth/auth-header";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/components/context/use-auth";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function AuthLayout() {
  const { user, ready } = useAuth();

  if (ready && user) return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;

  return (
    <main className="relative flex min-h-svh items-center justify-center bg-stone-50 px-4 py-12 transition-colors duration-300 dark:bg-[#0c0e14] overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-500/10" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-rose-400/10 blur-3xl dark:bg-rose-500/10" />

      {/* Floating Theme Toggle in top-right */}
      <div className="absolute top-5 right-5 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <AuthHeader />
        {ready && <Outlet />}
      </div>
    </main>
  );
}