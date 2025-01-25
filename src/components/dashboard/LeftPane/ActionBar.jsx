import React from "react";

export default function ActionBar() {
  return (
    <div id="action-bar" className="rounded px-5">
      <div
        className="btn-group d-flex justify-content-center align-items-end gap-5"
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          type="button"
          className="action-btn btn btn-outline-secondary px-5 py-4"
        >
          <span className="fs-5">🐜</span> <br />
          Feed
        </button>
        <button
          type="button"
          className="action-btn btn btn-outline-secondary px-5 py-4"
        >
          <span className="fs-5">💊</span> <br />
          Meds
        </button>
        <button
          type="button"
          className="action-btn btn btn-outline-secondary px-5 py-4"
        >
          <span className="fs-5">💬</span> <br />
          Chat
        </button>
      </div>
    </div>
  );
}
