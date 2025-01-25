import React from "react";
import "./leftpane.css";
import Pet from "./Pet";

function LeftPane() {
  return (
    <div id="left-pane" className="">
      <div className="container">
        <h1 className="title-container">Peter</h1>
      </div>
      <Pet />
    </div>
  );
}

export default LeftPane;
