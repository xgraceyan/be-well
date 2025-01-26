import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { AccountStore } from "./store/AccountStore";
import "./Onboarding.css";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_API_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Onboarding() {
    const [petName, setPetName] = useState(""); // State for pet name
    const [medications, setMedications] = useState([{ name: "", dose: "", time: "" }, { name: "", dose: "", time: "" }, { name: "", dose: "", time: "" }]);
    const setAccount = AccountStore((state) => state.setAccount); // Retrieve setAccount at the top level

    // Handle adding a new medication field
    const handleAddMedication = () => {
        setMedications([...medications, { name: "", dose: "", time: "" }]);
    };

    // Handle updating a medication field
    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...medications];
        updatedMedications[index][field] = value;
        setMedications(updatedMedications);
    };

    // Handle removing a medication field
    const handleRemoveMedication = (index) => {
        if (medications.length > 3) {
            const updatedMedications = medications.filter((_, i) => i !== index);
            setMedications(updatedMedications);
        }
        
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
                if (!med.name || !med.time) {
                    continue; // Skip if either field is empty
                }
                
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
                        task_type: "Medication",
                    });

                if (taskError) {
                    console.error("Error saving medication data:", taskError);
                    return;
                }
            }

            // Set AccountStore account_id
            setAccount({ account_email: user.email, account_uuid: user.id }); // Use setAccount here

            console.log("Onboarding data saved successfully!");
            window.location.href = "/"; // Redirect to the dashboard after saving
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    return (
        <div className="onboarding-background">
                <div className="onboarding-header">
                    <h2>Welcome!</h2>
                    <h3>Let's set up your account</h3>
                </div>
                <div className="onboarding-window">

                <div className="onboarding-form-div">
                    <div className="pick-name-container">
                        <span className="pick-name-pet-text">Pick a name for your pet</span>
                        <input
                            type="text"
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                            placeholder="Enter name..."
                        />
                    </div>

                    <div className="medications-container">
                        <h3>Medications</h3>
                        {medications.map((med, index) => (
                            <div className="input-box" key={index} style={{ marginBottom: "10px" }}>
                                <label>
                                        Name
                                    <input
                                        type="text"
                                        value={med.name}
                                        onChange={(e) =>
                                            handleMedicationChange(index, "name", e.target.value)
                                        }
                                        placeholder="Enter medication name..."
                                    />
                                </label>
                                <label>
                                        Dosage
                                    <input
                                        type="text"
                                        value={med.dose}
                                        onChange={(e) =>
                                            handleMedicationChange(index, "dose", e.target.value)
                                        }
                                        placeholder="Enter dose..."
                                    />
                                </label>
                                <label>
                                    Time
                                    <input
                                        type="time"
                                        value={med.time}
                                        onChange={(e) =>
                                            handleMedicationChange(index, "time", e.target.value)
                                        }
                                    />
                                </label>
                                <button className="onboarding-delete-button" onClick={() => handleRemoveMedication(index)}>Delete</button>
                            </div>
                        ))}
                        <button className="onboarding-buttons" onClick={handleAddMedication}>+</button>
                    </div>
                    <button className="onboarding-save-button" onClick={handleSaveOnboardingData}>Save</button>
                </div>
            </div>
        </div>
    );
}
