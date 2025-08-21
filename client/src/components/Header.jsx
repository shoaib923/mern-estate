import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-brand-dark via-slate-800 to-brand-dark shadow-lg sticky top-0 z-50"
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-3">
        
        {/* Logo */}
        <Link to={"/"} className="cursor-pointer">
          <motion.h1
            className="relative font-extrabold text-xl sm:text-2xl tracking-wide flex flex-wrap group"
          >
            <span className="text-brand-primary">Aurora</span>
            <span className="text-white ml-1">Estate</span>
            {/* Underline Animation */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-500 group-hover:w-full"></span>
          </motion.h1>
        </Link>

        {/* Aurora Themed Glowing Search (Desktop Only) */}
        <div className="hidden sm:flex relative p-[2px] rounded-full overflow-hidden group">
          {/* Glow layers (only on hover/focus) */}
          <span className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent 
            rounded-full blur-lg opacity-0 group-hover:opacity-60 group-focus-within:opacity-60 
            group-hover:animate-[spin_6s_linear_infinite] group-focus-within:animate-[spin_6s_linear_infinite] transition" />
          
          <span className="absolute inset-0 bg-gradient-to-r from-brand-accent via-brand-primary to-brand-secondary 
            rounded-full blur-xl opacity-0 group-hover:opacity-50 group-focus-within:opacity-50 
            group-hover:animate-[spin_8s_linear_infinite_reverse] group-focus-within:animate-[spin_8s_linear_infinite_reverse] transition" />

          {/* Search Form */}
          <form className="relative flex items-center bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full shadow-inner 
            w-44 hover:w-80 focus-within:w-80 transition-all duration-300">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent placeholder-slate-400 text-white focus:outline-none w-full px-2 text-sm"
            />
            <button
              type="submit"
              className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <FaSearch className="text-brand-primary text-lg cursor-pointer hover:scale-110 transition-transform" />
            </button>
          </form>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-white font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Sign in", path: "/sign-in" }
          ].map((link, i) => (
            <li key={i}>
              <Link
                to={link.path}
                className="relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-white text-xl cursor-pointer"
          >
            <FaSearch />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl cursor-pointer"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

{/* Mobile Search (toggle open/close with smooth collapse + infinite border) */}
<AnimatePresence>
  {showSearch && (
    <motion.div
      key="mobile-search"
      initial={{ height: 0,opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.5, 1] }}
      className="sm:hidden overflow-hidden"
    >
      <motion.div
        layout
        className="relative p-[4px] rounded-full overflow-hidden m-3"
      >
        {/* Glow Layer (infinite animation) */}
        <motion.span
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full blur-md"
        />

        {/* Search Form */}
        <form className="relative flex items-center bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-full shadow-inner">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent placeholder-slate-400 text-white focus:outline-none w-full px-2 text-sm"
          />
          {/* 🔍 Toggle button */}
          <button
            type="button"
            onClick={() => setShowSearch(false)}
            className="p-2"
          >
            <FaSearch className="text-brand-primary text-lg cursor-pointer hover:scale-110 transition-transform" />
          </button>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>







      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-2/3 bg-brand-dark text-white p-6 z-50 shadow-lg md:hidden"
          >
            {/* Close Button inside Drawer */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-3xl text-brand-primary hover:text-white transition cursor-pointer"
            >
              <FaTimes />
            </button>

            <ul className="space-y-6 text-lg font-medium mt-16">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Sign in", path: "/sign-in" }
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block relative group hover:text-brand-primary transition cursor-pointer"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
