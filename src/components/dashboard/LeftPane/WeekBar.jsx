import React from "react";
import WeekBarButton from "./WeekBarButton";

function WeekBar() {
  return (
    <div id="week-bar" className="d-flex justify-content-center">
      <div class="btn-group" role="group" aria-label="Basic outlined example">
        <WeekBarButton day="S" />
        <WeekBarButton day="M" />
        <WeekBarButton day="T" />
        <WeekBarButton day="W" />
        <WeekBarButton day="T" />
        <WeekBarButton day="F" />
        <WeekBarButton day="S" />
      </div>
    </div>
  );
}

export default WeekBar;
