import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { AccountStore } from "./store/AccountStore";
import "./Login.css";
import happyAnteater from "./assets/anteater_happy.png";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Login({ onSessionChange }) {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const setAccount = AccountStore((state) => state.setAccount);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Update Zustand store and callback
      if (session && session.user) {
        setAccount({
          account_email: session.user.email || "",
          account_uuid: session.user.id || "",
        });
        if (onSessionChange) onSessionChange(session);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const { data: session, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      alert("Sign-up successful! Check your email to confirm your account.");
      setView("login"); // Redirect to login after successful sign-up
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;

      alert("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="auth-container">
        <div className="login-header">
          <h2>BeWell</h2>
          <h3>and Feel Swell</h3>
        </div>
        <div className="auth-card">
          <h2 className="auth-title">
            {view === "login"
              ? "Log In"
              : view === "signup"
              ? "Sign Up"
              : "Recover Password"}
          </h2>
          {error && <p className="auth-error">{error}</p>}
          {view === "login" && (
            <form onSubmit={handleLogin}>
              <t className="login-text">Email Address</t>
              <input
                className="auth-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <t className="login-text">Password</t>
              <input
                className="auth-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="auth-button" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          )}
          {view === "signup" && (
            <form onSubmit={handleSignUp}>
              <t className="login-text">Email Address</t>
              <input
                className="auth-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <t className="login-text">Password</t>
              <input
                className="auth-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="auth-button" type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          )}
          {view === "forgotPassword" && (
            <form onSubmit={handlePasswordReset}>
              <input
                className="auth-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="auth-button" type="submit" disabled={loading}>
                {loading ? "Sending email..." : "Recover Password"}
              </button>
            </form>
          )}
          <div className="auth-footer">
            {view !== "signup" && (
              <p className="button-redirect">
                Don't have an account?{" "}
                <button onClick={() => setView("signup")} className="auth-link">
                  Sign Up
                </button>
              </p>
            )}
            {view !== "login" && (
              <t className="button-redirect">
                Already have an account?{" "}
                <button onClick={() => setView("login")} className="auth-link">
                  Log In
                </button>
              </t>
            )}
            {view !== "forgotPassword" && (
              <p className="button-redirect">
                Forgot your password?{" "}
                <button
                  onClick={() => setView("forgotPassword")}
                  className="auth-link"
                >
                  Recover Password
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
      <img src={happyAnteater} alt="happy anteater" className="auth-image" />
      <div class="semi-circle"></div>
    </div>
  );
}
