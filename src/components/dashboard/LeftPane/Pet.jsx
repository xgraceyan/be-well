import React from "react";
import anteater from "../../../assets/anteater.png";
import "./leftpane.css";

function Pet() {
  return (
    <div
      id="pet-pane"
      className="d-flex justify-content-center align-items-center"
    >
      <div className="anteater-img">
        <img src={anteater} alt="" height="500px" className="anteater-img" />
      </div>
    </div>
  );
}

export default Pet;
