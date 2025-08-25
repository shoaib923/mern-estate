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

  // Show toast if there's an error
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
        dispatch(signInSuccess(data)); // Save user to Redux
        toast.success(data.message || "Signed in successfully 🎉");
        navigate("/"); // redirect
      } else {
        dispatch(signInFailure(data.message || "Sign in failed"));
      }
    } catch  {
      dispatch(signInFailure("Server error, please try again later"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)]">
      <div className="w-full max-w-md bg-[var(--color-surface-2)] backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-[var(--color-border)]">
        <h1 className="text-3xl font-bold text-center mb-6 text-[var(--color-brand-primary)]">
          Sign In
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

          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--color-brand-secondary)] text-white font-semibold py-3 rounded-lg uppercase hover:bg-[var(--color-brand-primary)] transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="flex gap-2 justify-center mt-6 text-sm">
          <p className="text-[var(--color-text-muted)]">Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-[var(--color-brand-accent)] font-medium hover:underline">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
