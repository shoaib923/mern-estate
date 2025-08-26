import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error("Could not sign in with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="relative group overflow-hidden bg-[var(--color-brand-primary)] text-white font-semibold py-3 px-6 rounded-lg uppercase w-full flex justify-between items-center transition disabled:opacity-70 -mt-2"
    >
      {/* Animated hover background */}
      <span className="absolute inset-0 bg-[var(--color-brand-secondary)] w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>

      {/* Icon and text */}
      <span className="relative z-10 flex items-center justify-between w-full px-2">
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-center w-full">Continue with Google</span>
      </span>
    </button>
  );
}

export default OAuth;
