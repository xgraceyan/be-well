import React from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { AccountStore } from "../../store/AccountStore";

const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function Dashboard() {
  const navigate = useNavigate();

  // Zustand account store
  const account_email = AccountStore((state) => state.account_email);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      // Clear Zustand account store
      setAccount({ account_name: "", account_email: "", account_uuid: "" });

      navigate("/login");
    } else {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div id="dashboard">
      <div className="row">
        <div className="col-8">Hello {account_email}</div>
        <div className="col-4 bg-danger-subtle">Hi</div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
