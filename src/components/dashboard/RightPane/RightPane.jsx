import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import TasksCard from "./TasksCard";
import "./rightpane.css";
import { AccountStore } from "../../../store/AccountStore";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function RightPane() {
  const [tasks, setTasks] = useState([]); // State to store fetched tasks
  const [loading, setLoading] = useState(true);
  const setAccount = AccountStore((state) => state.setAccount); // Access Zustand's setAccount function
  const accountUuid = AccountStore((state) => state.account_uuid); // Access accountUuid from the store

  useEffect(() => {
    const fetchAccountUuid = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          console.error("Error fetching session or no session found:", error);
          return;
        }

        // Extract the user ID (accountUuid) from the session
        const userId = session.user.id;

        // Save accountUuid to AccountStore
        setAccount({
          account_uuid: userId,
          account_email: session.user.email, // Optionally save the email
        });
      } catch (err) {
        console.error("Unexpected error fetching account UUID:", err);
      }
    };

    // Fetch account UUID if not already set
    if (!accountUuid) {
      fetchAccountUuid();
    }
  }, [accountUuid, setAccount]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); // Reset loading state when accountUuid changes
      try {
        const { data, error } = await supabase
          .from("Tasks Log")
          .select("task_name, date")
          .eq("pet_id", accountUuid)
          .order("date", { ascending: true });

        if (error) {
          console.error("Error fetching tasks:", error);
          setTasks([]); // Reset tasks on error
        } else {
          console.log("Fetched tasks:", data);
          setTasks(data || []); // Ensure tasks are set to an empty array if no data
        }
      } catch (err) {
        console.error("Unexpected error fetching tasks:", err);
        setTasks([]); // Reset tasks on unexpected errors
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    if (accountUuid) {
      fetchTasks(); // Only fetch tasks if accountUuid is defined
    }
  }, [accountUuid]);

  if (!accountUuid) {
    return <div>Loading account details...</div>;
  }

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div id="right-pane" className="bg-color">
      <div className="container">
        <h1 className="title-container text-light">beWell</h1>
        <div className="d-grid gap-3">
          {tasks.map((task, index) => {
            let emoji = "✅"; // Default emoji
            if (
              task.task_name.toLowerCase().includes("dinner") ||
              task.task_name.toLowerCase().includes("lunch") ||
              task.task_name.toLowerCase().includes("breakfast")
            ) {
              emoji = "🍽️";
            } else if (task.task_name.toLowerCase().includes("medication")) {
              emoji = "💊";
            }

            return (
              <TasksCard
                key={index}
                cardData={{
                  emoji: emoji,
                  title: task.task_name,
                  desc: new Date(task.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RightPane;
