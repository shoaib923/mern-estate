import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { signOut } from "../redux/user/userSlice.js";

export default function Profile() {
  const [signingOut, setSigningOut] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [avatar, setAvatar] = useState(currentUser?.avatar || "/default-avatar.png");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    avatar: currentUser?.avatar || "/default-avatar.png",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Click avatar to open file picker
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Handle avatar file change (upload to backend)
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    setLoading(true);
    try {
      const res = await axios.post("/api/image/upload-image", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.url) {
        setAvatar(res.data.url);
        setFormData((prev) => ({ ...prev, avatar: res.data.url })); // ✅ Save avatar to formData
        toast.success("Image uploaded successfully 🎉");
      } else {
        toast.error("Image upload failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error uploading image ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle form submit (PUT to update route)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(`/api/user/update/${currentUser._id}`, formData);
      toast.success("Profile updated successfully 🎉");

      // ✅ Update local avatar immediately
      if (res.data?.user?.avatar) {
        setAvatar(res.data.user.avatar);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    setSigningOut(true);
    toast.info("Signing you out... ⏳");

    setTimeout(() => {
      dispatch(signOut());
      setSigningOut(false);
      toast.success("Signed out successfully 👋");
      navigate("/signin");
    }, 1500);
  };

  // Handle account deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await axios.delete("/api/user/delete", { data: { userId: currentUser._id } });
      dispatch(signOut());
      toast.success("Account deleted permanently 🗑️");
      navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)] px-6">
      <div className="relative w-full max-w-4xl rounded-2xl p-[2px]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-[var(--color-brand-accent)] blur-md opacity-70 animate-pulse"></div>

        <div className="relative rounded-2xl bg-[var(--color-surface-2)] p-8 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center justify-center gap-4 border-r border-[var(--color-border)] pr-0 md:pr-5">
            <div className="flex justify-center relative">
              {loading ? (
                <div className="w-28 h-28 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--color-brand-primary)]"></div>
                </div>
              ) : (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover border-2 border-[var(--color-brand-primary)] cursor-pointer"
                  onClick={handleAvatarClick}
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => navigate("/")}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
              >
                Back to Home
              </button>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition flex items-center justify-center"
              >
                {signingOut ? (
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
                  "Sign Out"
                )}
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg transition"
              >
                Delete Account
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <h1 className="text-2xl font-bold text-center mb-4 tracking-wide text-white">
              Profile
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] p-2.5 rounded-lg transition"
              />

              <input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] p-2.5 rounded-lg transition"
              />

              <input
                id="password"
                type="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] p-2.5 rounded-lg transition"
              />

              <button
                type="submit"
                disabled={loading}
                className="relative group overflow-hidden bg-[var(--color-brand-secondary)] text-white font-semibold py-2.5 px-5 rounded-lg uppercase transition disabled:opacity-70 flex items-center justify-center mt-1"
              >
                <span className="absolute inset-0 bg-[var(--color-brand-primary)] w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
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
                    "Update Profile"
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
