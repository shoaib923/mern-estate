import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text-on-dark)] flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <form className="w-full max-w-md flex flex-col gap-4">
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="px-4 py-2 rounded-full bg-[var(--color-input-bg)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] text-[var(--color-text-on-dark)] transition"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="px-4 py-2 rounded-full bg-[var(--color-input-bg)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] text-[var(--color-text-on-dark)] transition"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          className="px-4 py-2 rounded-full bg-[var(--color-input-bg)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] text-[var(--color-text-on-dark)] transition"
        />

        {/* Update Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] hover:brightness-110 transition"
        >
          Update
        </button>
      </form>

      {/* Sign Out & Delete Account as Links */}
      <div className="flex flex-col gap-3 mt-6 w-full max-w-md">
        <Link
          to="/sign-in"
          className="w-full text-center block px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] hover:brightness-110 transition"
        >
          Sign Out
        </Link>
        <Link
          to="/delete-account"
          className="w-full text-center block px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 transition text-white"
        >
          Delete Account
        </Link>
      </div>
    </div>
  );
}
