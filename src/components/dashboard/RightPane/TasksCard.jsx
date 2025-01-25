import React from "react";
import "./rightpane.css";

function TasksCard(props) {
  const { cardData } = props;
  const { emoji, title, desc } = cardData;

  return (
    <div className="card task-card">
      <div class="row gap-3 task-card-container">
        <div class="col-1 text-center d-flex align-items-center">
          <h1>{emoji}</h1>
        </div>
        <div className="col-10">
          <div className="card-body">
            <h5 className="card-title">
              <strong>{title}</strong>
            </h5>
            <p className="card-text">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksCard;
