import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  onSubmit?: (data: {
    fullName: string;
    email: string;
    password: string;
    agree: boolean;
  }) => Promise<void> | void;
  onSwitchToLogIn?: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSubmit, onSwitchToLogIn }) => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirm?: string;
    agree?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0–5
  }, [password]);

  const strengthLabel = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ][strength];
  const strengthColor = [
    "bg-red-500",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
    "bg-green-600",
  ][strength];

  const navigateToLogin = () => {
    navigate("/login");
  };

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Use at least 8 characters.";
    }

    if (!confirm) {
      nextErrors.confirm = "Please confirm your password.";
    } else if (password !== confirm) {
      nextErrors.confirm = "Passwords do not match.";
    }

    if (!agree)
      nextErrors.agree = "You must agree to the Terms to create an account.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    try {
      setLoading(true);
      await onSubmit?.({ fullName, email, password, agree });
    } catch (err) {
      setErrors({ general: "Sign up failed. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-red-400 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 border border-red-400 rounded-xl shadow-lg shadow-red-500/20 p-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-2">
          Sign Up
        </h1>
        <p className="text-sm text-red-300 mb-6">
          Create your account to track playlists and more.
        </p>

        {errors.general && (
          <div className="mb-4 bg-black/60 border border-red-400 text-red-300 rounded-md px-3 py-2">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex">
            <div className="pr-2">
              <label htmlFor="fullName" className="block mb-1 text-sm">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-black/70 border border-red-400 text-red-200 placeholder-red-300/50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                placeholder="Your full name"
                autoComplete="name"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-300">{errors.fullName}</p>
              )}
            </div>

            <div className="pl-2">
              <label htmlFor="email" className="block mb-1 text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/70 border border-red-400 text-red-200 placeholder-red-300/50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-300">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/70 border border-red-400 text-red-200 placeholder-red-300/50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition pr-10"
                placeholder="Create a strong password"
                autoComplete="new-password"
              />
              <div
                role="button"
                tabIndex={0}
                onClick={() => setShowPassword((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowPassword((v) => !v);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2
             h-8 px-2
             bg-black text-red-300
             flex items-center justify-center
             cursor-pointer select-none
             hover:text-red-200
             transition"
              >
                {showPassword ? "Hide" : "Show"}
              </div>
            </div>

            {/* Password strength meter */}
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-full bg-black/60 rounded-md overflow-hidden border border-red-400">
                  <div
                    className={`h-full ${strengthColor} transition-all`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-red-300">{strengthLabel}</span>
              </div>
              <p className="mt-1 text-xs text-red-300">
                Use 8+ chars with a mix of uppercase, lowercase, numbers &
                symbols.
              </p>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-300">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirm" className="block mb-1 text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-black/70 border border-red-400 text-red-200 placeholder-red-300/50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition pr-10"
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
              <div
                role="button"
                tabIndex={0}
                onClick={() => setShowPassword((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowPassword((v) => !v);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2
             h-8 px-2
             bg-black text-red-300
             flex items-center justify-center
             cursor-pointer select-none
             hover:text-red-200
             transition"
              >
                {showPassword ? "Hide" : "Show"}
              </div>
            </div>
            {errors.confirm && (
              <p className="mt-1 text-xs text-red-300">{errors.confirm}</p>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="accent-red-400"
            />
            <span className="text-sm text-red-300">
              I agree to the <span className="underline">Terms</span> &{" "}
              <span className="underline">Privacy Policy</span>.
            </span>
          </label>
          {errors.agree && (
            <p className="mt-1 text-xs text-red-300">{errors.agree}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-red-400 text-black rounded-lg font-semibold hover:bg-red-300 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-red-500/20"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-red-300">Already have an account?</span>{" "}
          <div
            role="button"
            onClick={navigateToLogin}
            className="w-full h-10 bg-red-400 text-black rounded-lg font-semibold hover:bg-red-300 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-red-500/20 flex items-center justify-center cursor-pointer select-none mt-2"
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
