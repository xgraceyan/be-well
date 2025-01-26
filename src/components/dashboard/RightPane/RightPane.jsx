import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import TasksCard from "./TasksCard";
import "./rightpane.css";
import { AccountStore } from "../../../store/AccountStore";
import TaskSubmitPrompt from "./TaskSubmitPrompt";
import moment from "moment";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function RightPane() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [newTaskType, setNewTaskType] = useState("Medication"); // State for new task type
  const setAccount = AccountStore((state) => state.setAccount);
  const accountUuid = AccountStore((state) => state.account_uuid);

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

        const userId = session.user.id;

        setAccount({
          account_uuid: userId,
          account_email: session.user.email,
        });
      } catch (err) {
        console.error("Unexpected error fetching account UUID:", err);
      }
    };

    if (!accountUuid) {
      fetchAccountUuid();
    }
  }, [accountUuid, setAccount]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("Tasks Log")
          .select("task_id, task_name, task_type, date")
          .eq("pet_id", accountUuid)
          .eq("completed", "false")
          .order("date", { ascending: true });

        if (error) {
          console.error("Error fetching tasks:", error);
          setTasks([]);
        } else {
          setTasks(data || []);
        }
      } catch (err) {
        console.error("Unexpected error fetching tasks:", err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    if (accountUuid) {
      fetchTasks();
    }
  }, [accountUuid]);

  const handleTaskDelete = (deletedTaskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.task_id !== deletedTaskId)
    );
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("Tasks Log")
        .insert([
          {
            task_name: newTaskName,
            date: newTaskTime,
            task_type: newTaskType, // Include task type
            pet_id: accountUuid,
          },
        ])
        .select();

      if (error) {
        console.error("Error adding task:", error);
        return;
      }

      setTasks((prevTasks) => [...prevTasks, ...data]);

      setNewTaskName("");
      setNewTaskTime("");
      setNewTaskType("Medication"); // Reset task type
      setShowModal(false);
    } catch (err) {
      console.error("Unexpected error adding task:", err);
    }
  };

  if (!accountUuid) {
    return <div>Loading account details...</div>;
  }

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div id="right-pane" className="bg-color">
      <div className="container">
        <div className="tasks-list-container">
          <h1 className="title-container text-light">beWell</h1>
          <div className="d-grid gap-3">
            {tasks.map((task) => {
              let emoji = "🗒️";
              if (task.task_type === "Meal") {
                emoji = "🍽️";
              } else if (task.task_type === "Medication") {
                emoji = "💊";
              }

              return (
                <div key={task.task_id}>
                  <TaskSubmitPrompt
                    id={task.task_id}
                    taskID={task.task_id}
                    onTaskDelete={handleTaskDelete}
                    petID={accountUuid}
                  />
                  <TasksCard
                    id={task.task_id}
                    cardData={{
                      emoji: emoji,
                      title: task.task_name,
                      desc: moment(task.date.toString()).utc().format("LT"),
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="add-task-container">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add-task-modal"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="modal fade" id="add-task-modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Task</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="modal-body">
                <div className="mb-3">
                  <span className="task-instr-label">Task Name</span>
                  <input
                    type="text"
                    className="form-control"
                    id="taskName"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <span className="task-instr-label">Task Time</span>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="taskTime"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <span className="task-instr-label">Task Type</span>
                  <select
                    className="form-select"
                    id="taskType"
                    value={newTaskType}
                    onChange={(e) => setNewTaskType(e.target.value)}
                    required
                  >
                    <option value="Medication">Medication</option>
                    <option value="Meal">Meal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightPane;
