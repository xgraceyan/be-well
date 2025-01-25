import React from "react";
import RightPane from "./RightPane/RightPane";
import LeftPane from "./LeftPane/LeftPane";

function Dashboard() {
  return (
    <div id="dashboard">
      <div className="row">
        <div className="col-8">{<LeftPane />}</div>
        <div className="col-4">{<RightPane />}</div>
      </div>
    </div>
  );
}

export default Dashboard;
