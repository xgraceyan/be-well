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

  const accountUuid = AccountStore((state) => state.account_uuid);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase
          .from("Tasks Log")
          .select("task_name, date")
          .eq("pet_id", accountUuid)
          .order("date", { ascending: true });

        if (error) {
          console.error("Error fetching tasks:", error);
        } else {
          console.log("Fetched tasks:", data);
          setTasks(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (accountUuid) {
      fetchTasks();
    }
  }, [accountUuid]);


  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div id="right-pane" className="bg-color">
      <div className="container">
        <h1 className="title-container text-light">beWell</h1>
        <div className="d-grid gap-3">
          {tasks.map((task, index) => (
            <TasksCard
              key={index}
              cardData={{
                emoji: "💊",
                title: task.task_name,
                desc: new Date(task.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightPane;
