import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

const LogIn: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    try {
      setLoading(true);
      const result = await apiService.login({ email, password, remember });
      
      if (result.error) {
        setErrors({ general: result.error });
      } else {
        // Login successful, redirect to home or profile
        navigate("/myprofile");
      }
    } catch (err) {
      setErrors({
        general: "Log in failed. Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-red-400 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 border border-red-400 rounded-xl shadow-lg shadow-red-500/20 p-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-2">
          Log In
        </h1>
        <p className="text-sm text-red-300 mb-6">
          Access your YouTube Playlist Project account.
        </p>

        {errors.general && (
          <div className="mb-4 bg-black/60 border border-red-400 text-red-300 rounded-md px-3 py-2">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
                placeholder="••••••••"
                autoComplete="current-password"
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
            {errors.password && (
              <p className="mt-1 text-xs text-red-300">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-red-400"
              />
              <span className="text-sm text-red-300">Remember me</span>
            </label>
            <div
              role="button"
              className="relative
             h-8 px-2
             underline
             underline-offset-3
             text-red-300
             flex items-center justify-center
             cursor-pointer select-none
             hover:text-red-200
             transition"
            >
              Forgot password?
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-red-400 text-black rounded-lg font-semibold hover:bg-red-300 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-red-500/20"
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-red-300">Don’t have an account?</span>{" "}
          <div
            role="button"
            onClick={navigateToSignUp}
            className="w-full h-10 bg-red-400 text-black rounded-lg font-semibold hover:bg-red-300 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-red-500/20 flex items-center justify-center cursor-pointer select-none mt-2"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
