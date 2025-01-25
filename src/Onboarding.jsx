import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Onboarding() {
  const [petName, setPetName] = useState(""); // State for pet name
  const [medications, setMedications] = useState([]); // Array for medication name-time pairs

  // Handle adding a new medication field
  const handleAddMedication = () => {
    setMedications([...medications, { name: "", time: "" }]);
  };

  // Handle updating a medication field
  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
  };

  // Handle removing a medication field
  const handleRemoveMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  // Handle saving onboarding data
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

      // Insert the pet data
      const { error: petError } = await supabase
        .from("Pet")
        .insert({
          pet_id: user.id, // Use the user's UUID as the pet_id
          username: petName,
        });

      if (petError) {
        console.error("Error saving pet data:", petError);
        return;
      }

      // Insert medication data into the Tasks Log table
      for (const med of medications) {
        const today = new Date();
      const [hours, minutes] = med.time.split(":");
      const medDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        parseInt(hours, 10),
        parseInt(minutes, 10)
      );

      const { error: taskError } = await supabase
        .from("Tasks Log")
        .insert({
          pet_id: user.id,
          task_name: med.name,
          date: medDate.toISOString(), // Convert to ISO string for the database
        });

        if (taskError) {
          console.error("Error saving medication data:", taskError);
          return;
        }
      }

      console.log("Onboarding data saved successfully!");
      window.location.href = "/"; // Redirect to the dashboard after saving
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
        <h3>Medications</h3>
        {medications.map((med, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label>
              Medication Name:
              <input
                type="text"
                value={med.name}
                onChange={(e) =>
                  handleMedicationChange(index, "name", e.target.value)
                }
                placeholder="Enter medication name"
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                value={med.time}
                onChange={(e) =>
                  handleMedicationChange(index, "time", e.target.value)
                }
              />
            </label>
            <button onClick={() => handleRemoveMedication(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddMedication}>Add Medication</button>
      </div>
      <button onClick={handleSaveOnboardingData}>Save</button>
    </div>
  );
}
