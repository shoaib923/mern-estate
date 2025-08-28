import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// eslint-disable-next-line no-unused-vars 
import { AnimatePresence, motion } from "framer-motion";

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}



export default function App() {
  const location = useLocation();

  return (
    <>
      <Header />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<PageTransition><Home /></PageTransition>} />
          <Route path='/sign-in' element={<PageTransition><SignIn /></PageTransition>} />
          <Route path='/sign-up' element={<PageTransition><SignUp /></PageTransition>} />
          <Route path='/about' element={<PageTransition><About /></PageTransition>} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<PageTransition><Profile /></PageTransition>} />
          </Route>
        </Routes>
      </AnimatePresence>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
