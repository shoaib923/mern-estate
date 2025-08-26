import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Account created successfully 🎉");
        navigate("/sign-in");
      } else {
        toast.error(data.message || "Signup failed!");
      }
    } catch {
      toast.error("Server error, please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)]">
      {/* Glow border wrapper (same as SignIn) */}
      <div className="relative w-full max-w-md rounded-2xl p-[2px] bg-transparent">
        {/* Glowing border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-[var(--color-brand-accent)] blur-md opacity-70 animate-pulse"></div>

        {/* Inner card */}
        <div className="relative rounded-2xl bg-[var(--color-surface-2)] p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-6 text-[var( --color-text-on-dark)]">
            Create Account
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              value={formData.username || ""}
              id="username"
              placeholder="Username"
              type="text"
              onChange={handleChange}
              className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none p-3 rounded-lg transition"
            />
            <input
              value={formData.email || ""}
              id="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none p-3 rounded-lg transition"
            />
            <input
              value={formData.password || ""}
              id="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none p-3 rounded-lg transition"
            />

            {/* Button */}
<button
  disabled={loading}
  className="relative group overflow-hidden bg-[var(--color-brand-secondary)] text-white font-semibold py-3 px-6 rounded-lg uppercase transition disabled:opacity-70 flex items-center justify-center gap-2"
>
  {/* Animated background fill */}
  <span className="absolute inset-0 bg-[var(--color-brand-primary)] w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>

  {/* Text or loader (kept above fill with z-10) */}
  <span className="relative z-10">
    {loading ? (
      <svg
        className="w-5 h-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    ) : (
      "Sign Up"
    )}
  </span>
</button>

          </form>

          {/* Footer */}
          <div className="flex gap-2 justify-center mt-6 text-sm">
            <p className="text-[var(--color-text-muted)]">
              Already have an account?
            </p>
            <Link to="/sign-in">
              <span className="text-[var(--color-brand-accent)] font-medium hover:underline">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
