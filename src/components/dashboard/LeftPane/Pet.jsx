import React from "react";
import anteater from "../../../assets/anteater.png";
import "./leftpane.css";
import anteater_happy from "../../../assets/anteater_happy.png";
import anteater_sad from "../../../assets/anteater_sad.png"
import { usePetData } from "../../../UserData";

function Pet() {
  var photoSrc = null
  const petMood = usePetData();
  console.log(petMood?.mood)
  if (petMood == 5) {
    photoSrc = anteater_happy
  }
  else if (petMood?.mood > 1) {
    photoSrc = anteater
  }
  else {
    photoSrc = anteater_sad
  }
  return (
    <div
      id="pet-pane"
      className="d-flex justify-content-center align-items-center"
    >
      <div className="anteater-img">
        <img src={photoSrc} alt="" height="500px" className="anteater-img" />
      </div>
    </div>
  );
}

export default Pet;
