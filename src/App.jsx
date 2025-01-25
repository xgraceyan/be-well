import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./Login";
import { createClient } from "@supabase/supabase-js";
import Onboarding from "./Onboarding";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (session && session.user) {
        checkIfNewUser(session.user); // Call checkIfNewUser if a session exists
      }

      setLoading(false);
    });

    const unsubscribe = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session && session.user) {
        checkIfNewUser(session.user); // Call checkIfNewUser on auth state change
      } else {
        setNewUser(false); // Reset newUser state if no session
      }
    });
  }, []);

  // Check if the user is new
  const checkIfNewUser = async (user) => {
    try {
      const { data: pets, error } = await supabase
        .from("Pet")
        .select("pet_id")
        .eq("pet_id", user.id); // Correct the column name

      if (error) {
        console.error("Error checking if user is new:", error);
      } else {
        console.log("Pets:", pets);
        setNewUser(pets.length === 0);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Onboarding route */}
        <Route
          path="/onboarding"
          element={<Onboarding />}
        />
        {/* Default dashboard route */}
        <Route
          path="/"
          element={
            session
              ? newUser
                ? <Navigate to="/onboarding" replace />
                : <Dashboard />
              : <Navigate to="/login" replace />
          }
        />
        {/* Login route */}
        <Route
          path="/login"
          element={session ? <Navigate to="/" replace /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
