import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Onboarding() {
  const [petName, setPetName] = useState(""); // State for pet name
  const [medTime, setMedTime] = useState(""); // State for medication time

  // Handle saving the pet name and medication time
  const handleSaveOnboardingData = async () => {
    try {
      // Get the current user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Error fetching current user:", authError);
        return;
      }

      // Insert data into the pets table for the current user
      const { error } = await supabase
        .from("Pet") // Ensure the table name matches your Supabase table
        .insert({
          pet_id: user.id, // Use the user's UUID as the pet_id
          username: petName,
          med_time: medTime,
        });

      if (error) {
        console.error("Error saving onboarding data:", error);
      } else {
        console.log("Onboarding data saved successfully!");
        window.location.href = "/"; // Redirect to the dashboard after saving
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div>
      <h2>Welcome! Let's set up your account</h2>
      <div>
        <label>
          Pet Name:
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Enter your pet's name"
          />
        </label>
      </div>
      <div>
        <label>
          Medication Time:
          <input
            type="time"
            value={medTime}
            onChange={(e) => setMedTime(e.target.value)}
            placeholder="Select time for medication"
          />
        </label>
      </div>
      <button onClick={handleSaveOnboardingData}>Save</button>
    </div>
  );
}
