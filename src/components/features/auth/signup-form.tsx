import { useNavigate } from "react-router";
import { useState, type SubmitEvent } from "react";
import { useAuth } from "@/components/context/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Eye, EyeOff, AlertCircle } from "lucide-react";

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return "Could not connect to the API. Check that the API server is running on port 7000.";
}

export function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const currentUser = await signup(name, email, password);
      const destination = currentUser.role === "ADMIN" ? "/admin" : "/user";
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <Label htmlFor="auth-name">Your Full Name</Label>
        <Input
          id="auth-name"
          type="text"
          autoComplete="name"
          placeholder="Chef Jane Doe"
          required
          minLength={2}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="auth-email">Email Address</Label>
        <Input
          id="auth-email"
          type="email"
          autoComplete="email"
          placeholder="chef@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="auth-password">Password</Label>
        <div className="relative">
          <Input
            id="auth-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="mt-1 text-[11px] text-stone-400">
          Must include uppercase letter & number.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={busy}
        className="w-full justify-center gap-2 py-2.5 mt-2 shadow-md"
      >
        <UserPlus className="h-4 w-4" />
        <span>{busy ? "Creating Account…" : "Create Account"}</span>
      </Button>
    </form>
  );
}
