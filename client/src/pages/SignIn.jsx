import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(signInStart());

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        toast.success(data.message || "Signed in successfully 🎉");
        navigate("/");
      } else {
        dispatch(signInFailure(data.message || "Sign in failed"));
      }
    } catch {
      dispatch(signInFailure("Server error, please try again later"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)] px-4">
      {/* Glow border wrapper */}
      <div className="relative w-full max-w-md rounded-2xl p-[2px]">
        {/* Glowing border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-[var(--color-brand-accent)] blur-md opacity-70 animate-pulse"></div>

        {/* Inner card */}
        <div className="relative rounded-2xl bg-[var(--color-surface-2)] p-8 shadow-xl">
          {/* Two-tone title */}
          <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
            <span className="text-white">Sign&nbsp;</span>
            <span className="text-[var(--color-brand-primary)]">In</span>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none p-3 rounded-lg transition"
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none p-3 rounded-lg transition"
            />

      {/* Sign In button */}
<button
  type="submit"
  disabled={loading}
  className="relative group overflow-hidden bg-[var(--color-brand-secondary)] text-white font-semibold py-3 px-6 rounded-lg uppercase transition disabled:opacity-70 flex items-center justify-center gap-2"
>
  {/* Animated background fill */}
  <span className="absolute inset-0 bg-[var(--color-brand-primary)] w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>

  {/* Text or loader */}
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
      "Sign In"
    )}
  </span>
</button>






          </form>

          {/* Footer links */}
          <div className="flex gap-2 justify-center mt-6 text-sm">
            <p className="text-[var(--color-text-muted)]">
              Don&apos;t have an account?
            </p>
            <Link to="/sign-up">
              <span className="text-[var(--color-brand-accent)] font-medium hover:underline">
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
