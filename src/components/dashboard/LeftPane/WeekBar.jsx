import React from "react";
import WeekBarButton from "./WeekBarButton";
import WeekBarModal from "./WeekBarModal";

function WeekBar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div id="week-bar" className="d-flex justify-content-center">
      {days.map((day, index) => {
        return <WeekBarModal id={index} key={index} />;
      })}
      <div class="btn-group" role="group" aria-label="Basic outlined example">
        {days.map((day, index) => {
          return <WeekBarButton day={day} id={index} />;
        })}
      </div>
    </div>
  );
}

export default WeekBar;
