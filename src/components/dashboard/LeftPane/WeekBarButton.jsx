import React from "react";

export default function WeekBarButton(props) {
  const { day } = props;
  return (
    <button type="button" class="btn btn-outline-secondary px-4 py-3">
      {day}
    </button>
  );
}
