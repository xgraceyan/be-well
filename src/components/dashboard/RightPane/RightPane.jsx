import React from "react";
import TasksCard from "./TasksCard";
import "./rightpane.css";

function RightPane() {
  return (
    <div id="right-pane" className="bg-color">
      <div className="container">
        <h1 className="title-container text-light">beWell</h1>
        <div className="d-grid gap-3">
          {
            <TasksCard
              cardData={{
                emoji: "💊",
                title: "Take your meds",
                desc: "11:40 pm",
              }}
            />
          }
          {
            <TasksCard
              cardData={{
                emoji: "🍽️",
                title: "Eat dinner",
                desc: "11:45 pm",
              }}
            />
          }
          {
            <TasksCard
              cardData={{
                emoji: "🍽️",
                title: "Eat dinner",
                desc: "11:45 pm",
              }}
            />
          }
          {
            <TasksCard
              cardData={{
                emoji: "🍽️",
                title: "Eat dinner",
                desc: "11:45 pm",
              }}
            />
          }
          {
            <TasksCard
              cardData={{
                emoji: "🍽️",
                title: "Eat dinner",
                desc: "11:45 pm",
              }}
            />
          }
          {
            <TasksCard
              cardData={{
                emoji: "🍽️",
                title: "Eat dinner",
                desc: "11:45 pm",
              }}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default RightPane;
