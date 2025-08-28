import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { signOut } from "../redux/user/userSlice.js";
import { ArrowLeftIcon, ArrowRightOnRectangleIcon, TrashIcon } from "@heroicons/react/24/solid";

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
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleAvatarClick = () => fileInputRef.current.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be smaller than 5MB");

    const uploadData = new FormData();
    uploadData.append("image", file);

    setLoading(true);
    try {
      const res = await axios.post("/api/image/upload-image", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.url) {
        setAvatar(res.data.url);
        setFormData((prev) => ({ ...prev, avatar: res.data.url }));
        toast.success("Image uploaded successfully 🎉");
      } else toast.error("Image upload failed ❌");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error uploading image ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/user/update/${currentUser._id}`, formData);
      toast.success("Profile updated successfully 🎉");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setSigningOut(true);
 
    setTimeout(() => {
      dispatch(signOut());
      setSigningOut(false);
      toast.success("Signed out successfully 👋");
      navigate("/signin");
    }, 1500);
  };

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
  <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)] px-4 overflow-x-hidden">
    {/* Glow border wrapper */}
    <div className="relative w-full max-w-4xl rounded-2xl p-[2px]">
      {/* Glowing border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-[var(--color-brand-accent)] blur-md opacity-50 animate-pulse"></div>

      {/* Inner card */}
      <div className="relative rounded-2xl bg-[var(--color-surface-2)] p-8 shadow-xl flex flex-col md:flex-row gap-6">
        
        {/* LEFT SIDE - Avatar & Actions */}
        <div className="flex flex-col items-center justify-start gap-4 md:w-1/3 border-b md:border-b-0 md:border-r border-[var(--color-border)] pb-4 md:pb-0 md:pr-5">
          <div className="flex justify-center relative mb-4">
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
            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" />
          </div>

          {/* Action Icons Row */}
          <div className="flex items-center justify-center gap-4 w-full mt-2">
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer p-3 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] rounded-lg transition"
              title="Home"
            >
              <ArrowLeftIcon className="w-5 h-5 text-white" />
            </div>

            <div
              onClick={handleSignOut}
              className={`cursor-pointer p-3 rounded-lg transition ${signingOut ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"}`}
              title="Sign Out"
            >
              {signingOut ? (
                <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                <ArrowRightOnRectangleIcon className="w-5 h-5 text-white" />
              )}
            </div>

            <div
              onClick={handleDelete}
              className="cursor-pointer p-3 bg-red-700 hover:bg-red-800 rounded-lg transition"
              title="Delete Account"
            >
              <TrashIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Profile Form */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center md:text-left mb-4 tracking-wide text-white">
            Profile
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-0 outline-none p-3 rounded-lg transition"
            />

            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-0 outline-none p-3 rounded-lg transition"
            />

            <input
              id="password"
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-0 outline-none p-3 rounded-lg transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] transition font-semibold disabled:opacity-70 relative group overflow-hidden mt-2"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);


}
