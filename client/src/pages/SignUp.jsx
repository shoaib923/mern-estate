import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)]">
      <div className="w-full max-w-md bg-[var(--color-surface-2)] backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-[var(--color-border)]">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-[var(--color-brand-primary)]">
          Create Account
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none p-3 rounded-lg transition"
            id="username"
            placeholder="Username"
            type="text"
          />
          <input
            className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none p-3 rounded-lg transition"
            id="email"
            placeholder="Email"
            type="email"
          />
          <input
            className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none p-3 rounded-lg transition"
            id="password"
            placeholder="Password"
            type="password"
          />

          {/* Button */}
          <button
            className="bg-[var(--color-brand-secondary)] text-white font-semibold py-3 rounded-lg uppercase hover:bg-[var(--color-brand-primary)] transition disabled:opacity-70"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="flex gap-2 justify-center mt-6 text-sm">
          <p className="text-[var(--color-text-muted)]">Already have an account?</p>
          <Link to="/sign-in">
            <span className="text-[var(--color-brand-accent)] font-medium hover:underline">
              Sign In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
