import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./Login";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const unsubscribe = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={session ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={session ? <Navigate to="/" replace /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
