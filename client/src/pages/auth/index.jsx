import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "../../lib/apiClient";
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { setNotif } from "../../features/auth/notifySlice";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  const dispatch = useDispatch();

  useEffect(() => {
    setUsername("");
    setConfirmPassword("");
  }, [activeTab]);

  const validateSignUp = () => {
    if (!email.length && !password.length && !username.length) {
      dispatch(setNotif({ message: "Please fill the details", type: "error" }));
      return false;
    } else if (!email.length) {
      dispatch(setNotif({ message: "Email is required", type: "error" }));
      return false;
    } else if (!username.length) {
      dispatch(setNotif({ message: "Username is required", type: "error" }));
      return false;
    } else if (!password.length) {
      dispatch(setNotif({ message: "Password is required", type: "error" }));
      return false;
    } else if (password.length < 7) {
      dispatch(setNotif({
        message: "Password should be greater than 6 characters",
        type: "error",
      }));
      return true;
    } else if (password !== confirmPassword) {
      dispatch(setNotif({
        message: "Confirm password must match the password.",
        type: "error",
      }));
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email.length && !password.length) {
      dispatch(setNotif({ message: "Please fill the details", type: "error" }));
      return false;
    } else if (!email.length) {
      dispatch(setNotif({ message: "Email is required", type: "error" }));
      return false;
    } else if (!password.length) {
      dispatch(setNotif({ message: "Password is required", type: "error" }));
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (validateLogin()) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        dispatch(setNotif({ message: "login successfull", type: "success" }));
        if (response.status === 200 && response.data.user.id) {
          dispatch(setUser(response.data.user));
          if (response.data.user.profileSetup) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        }
        console.log(response.data.user);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        dispatch(setNotif({ message: err.response.data, type: "error" }));
      } else {
        dispatch(setNotif({
          message: "Login failed. Please try again.",
          type: "error",
        }));
        console.log(err.message);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (validateSignUp()) {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, username, password },
          { withCredentials: true }
        );
        dispatch(setUser(response.data.user));
        dispatch(setNotif({ message: "user created", type: "success" }));
        if (response.status === 201) {
          navigate("/profile");
        }
        console.log(response.data);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        if (err.response.data.includes("Email")) {
          dispatch(setNotif({ message: err.response.data, type: "error" }));
        } else if (err.response.data.includes("Username")) {
          dispatch(setNotif({ message: err.response.data, type: "error" }));
        } else {
          dispatch(setNotif({
            message: "Signup failed. Please try again.",
            type: "error",
          }));
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block">
          <img
            src="https://images.pexels.com/photos/1655329/pexels-photo-1655329.jpeg"
            alt="chat app"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Auth Card */}
        <div className="bg-gray-800 text-white p-8 md:p-12 w-full flex flex-col justify-center">
          <div className="flex gap-1 mx-auto mb-4 items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4787/4787023.png"
              alt="namaste-icon"
              className="w-12 h-12"
            />

            <motion.h2
              className="text-3xl font-bold text-center mb-1"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome
            </motion.h2>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4787/4787023.png"
              alt="namaste-icon"
              className="w-12 h-12"
            />
          </div>
          <motion.p
            className="text-center text-gray-400 mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Fill in the details to get started with the best chat app!
          </motion.p>

          {/* Tabs */}
          <div className="flex justify-center border-b border-gray-700 mb-6">
            {["login", "signup"].map((tab, index) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "text-purple-400 border-b-2 border-purple-500"
                    : "text-gray-400 hover:text-purple-300"
                } ${index === 1 ? "ml-4" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Animate Form */}
          <AnimatePresence mode="wait">
            {activeTab === "login" && (
              <motion.form
                key="login"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
                onSubmit={handleLogin}
              >
                <motion.input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  whileFocus={{ scale: 1.02 }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <motion.input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  whileFocus={{ scale: 1.02 }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
                  type="submit"
                >
                  Login
                </motion.button>
              </motion.form>
            )}

            {activeTab === "signup" && (
              <motion.form
                key="signup"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
                onSubmit={handleSignUp}
              >
                <motion.input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  whileFocus={{ scale: 1.02 }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <motion.input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  whileFocus={{ scale: 1.02 }}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <motion.input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  whileFocus={{ scale: 1.02 }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <motion.input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  whileFocus={{ scale: 1.02 }}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
                  type="submit"
                >
                  Signup
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
