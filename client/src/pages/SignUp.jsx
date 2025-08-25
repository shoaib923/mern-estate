import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  // frontend validation
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
       navigate('/sign-in');
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
      <div className="w-full max-w-md bg-[var(--color-surface-2)] backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-[var(--color-border)]">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-[var(--color-brand-primary)]">
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
            className="bg-[var(--color-brand-secondary)] text-white font-semibold py-3 rounded-lg uppercase hover:bg-[var(--color-brand-primary)] transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
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
              </>
            ) : (
              "Sign Up"
            )}
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
  );
}

export default SignUp;
