import React from "react";
import moment from "moment";

export default function WeekBarButton({ day, id }) {
  const today = moment().day() == id;

  return (
    <button
      type="button"
      className="btn btn-outline-secondary px-4 py-3"
      data-bs-toggle="modal"
      data-bs-target={"#week-modal-" + id}
    >
      {today ? (
        <span className="text-primary">
          <strong>{day}</strong>
        </span>
      ) : (
        day
      )}
    </button>
  );
}
