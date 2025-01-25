import React from "react";
import "./leftpane.css";
import Pet from "./Pet";
import WeekBar from "./WeekBar";
import ActionBar from "./ActionBar";
import grass from "../../../assets/grass.png";
import { PetStore } from "../../../store/PetStore";

function LeftPane() {
  const pets = PetStore((state) => state);
  return (
    <div id="left-pane" className="">
      <div className="container">
        <h1 className="title-container-sm">Peter</h1>
        <WeekBar />
      </div>
      <ActionBar />
      <img src={grass} alt="" height="300px" className="grass-img" />
      <Pet />
    </div>
  );
}

export default LeftPane;
