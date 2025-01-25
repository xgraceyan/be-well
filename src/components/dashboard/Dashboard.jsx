import React from "react";
import RightPane from "./RightPane/RightPane";

function Dashboard() {
  return (
    <div id="dashboard">
      <div className="row">
        <div className="col-8">Hello</div>
        <div className="col-4">{<RightPane />}</div>
      </div>
    </div>
  );
}

export default Dashboard;
