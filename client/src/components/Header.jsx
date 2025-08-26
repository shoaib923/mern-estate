import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-[var(--color-text-on-dark)] sticky top-0 z-50 shadow-lg bg-[var(--color-brand-dark)]"
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3">
        {/* Logo */}
        <Link to="/" className="cursor-pointer select-none">
          <motion.h1
            whileHover={{ y: -1 }}
            className="relative font-extrabold text-xl sm:text-2xl tracking-wide flex flex-wrap group"
          >
            <span className="text-[var(--color-brand-primary)]">Aurora</span>
            <span className="text-[var(--color-text-on-dark)] ml-1">Estate</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-brand-primary)] transition-all duration-500 group-hover:w-full" />
          </motion.h1>
        </Link>

        {/* Desktop Search */}
        <div className="hidden sm:flex relative p-[2px] rounded-full overflow-hidden group">
          {/* Glow layers */}
          <span className="pointer-events-none absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-60 group-focus-within:opacity-60 bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-[var(--color-brand-accent)] transition group-hover:animate-[spin_6s_linear_infinite] group-focus-within:animate-[spin_6s_linear_infinite]" />
          <span className="pointer-events-none absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 group-focus-within:opacity-50 bg-gradient-to-r from-[var(--color-brand-accent)] via-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] transition group-hover:animate-[spin_8s_linear_infinite_reverse] group-focus-within:animate-[spin_8s_linear_infinite_reverse]" />

         {/* Search Form */}
<form className="relative flex items-center bg-[var(--color-input-bg)] backdrop-blur-md px-3 py-1 rounded-full shadow-inner 
  w-44 md:w-44 md:hover:w-80 md:focus-within:w-80 transition-all duration-300 
  border border-[var(--color-border)] focus-within:border-[var(--color-brand-primary)] focus-within:shadow-md">
  
  <label htmlFor="desktop-search" className="sr-only">Search</label>
  
  <input
    id="desktop-search"
    type="text"
    placeholder="Search..."
    className="bg-transparent placeholder-[var(--color-text-muted)] text-[var(--color-text-on-dark)] 
    focus:outline-none w-full px-2 text-base"
  />
  
  <button
    type="submit"
    className="p-2 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-[var(--color-brand-primary)] transition"
    aria-label="Search"
    title="Search"
  >
    <FaSearch className="text-[var(--color-brand-primary)] text-base" />
  </button>
</form>

        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Sign in", path: "/sign-in" },
          ].map((link, i) => (
            <li key={i}>
              <Link to={link.path} className="relative group cursor-pointer">
                <span className="transition-colors">{link.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setShowSearch((s) => !s)}
            className="text-2xl cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] rounded-full p-1"
            aria-label="Toggle search"
          >
            <FaSearch />
          </button>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="text-3xl cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] rounded-md p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

     {/* Mobile Search */}
<AnimatePresence>
  {showSearch && (
    <motion.div
      key="mobile-search"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 25 }}
      className="sm:hidden overflow-hidden"
    >
      <motion.div layout className="relative p-[4px] rounded-full overflow-hidden m-3">
        {/* Glow - only when focus inside */}
        <motion.span
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 rounded-full blur-md 
                     bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-[var(--color-brand-accent)]
                     opacity-0 group-focus-within:opacity-100"
        />

        <form className="group relative flex items-center bg-[var(--color-input-bg)] backdrop-blur-md px-3 py-2 
                        rounded-full shadow-inner border border-[var(--color-border)] focus-within:border-[var(--color-brand-primary)]">
          <label htmlFor="mobile-search" className="sr-only">Search</label>
          
          {/* Search Icon (static, left side) */}
          <FaSearch className="text-[var(--color-text-muted)] text-base mr-2" />

          {/* Input */}
          <input
            id="mobile-search"
            type="text"
            placeholder="Search..."
            className="bg-transparent placeholder-[var(--color-text-muted)] text-[var(--color-text-on-dark)] 
                       focus:outline-none w-full text-sm"
          />

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowSearch(false)}
            className="ml-2 p-3 rounded-full hover:bg-white/10 focus-visible:outline-none 
                       focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]"
            aria-label="Close search"
          >
            <FaTimes className="text-[var(--color-brand-primary)] text-lg" />
          </button>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-2/3 bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)] p-6 z-[60] shadow-2xl md:hidden"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-3xl text-[var(--color-brand-primary)] hover:text-white transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] rounded-md"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>

            <ul className="space-y-6 text-lg font-medium mt-16">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Sign in", path: "/sign-in" },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block relative group hover:text-[var(--color-brand-primary)] transition cursor-pointer"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
