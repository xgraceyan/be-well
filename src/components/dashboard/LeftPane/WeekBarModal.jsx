import React, { useEffect, useState } from "react";
import moment from "moment";
import { supabase } from "../../../supabase/supabaseClient";
// var moment = require("moment");

export default function WeekBarModal({ id }) {
  const [dayData, setDayData] = useState();

  let startTimestamp = moment().day(id).hour(0).minute(0).toISOString(true);
  let endTimestamp = moment()
    .day(id)
    .hour(23)
    .minute(59)
    .second(59)
    .toISOString(true);

  startTimestamp = startTimestamp.substring(0, startTimestamp.length - 6);

  endTimestamp = endTimestamp.substring(0, endTimestamp.length - 6);

  const date = moment().day(id);

  useEffect(() => {
    const getDayData = async (user) => {
      try {
        const { data, error } = await supabase
          .from("Tasks Log")
          .select("*")
          .eq("completed", "TRUE")
          .gte("date", startTimestamp)
          .lt("date", endTimestamp)
          .order("date", { ascending: false });

        if (error) {
          console.error("Error checking if user is new:", error);
        } else {
          setDayData(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    getDayData();
  }, [dayData]);

  return (
    <div class="modal fade" id={"week-modal-" + id}>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <strong>{date.format("dddd, MMMM DD")}</strong>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form>
            <div class="modal-body">
              {dayData && dayData.length > 0 ? (
                dayData.map((day) => {
                  return (
                    <div className="day-info mb-4">
                      <h5>
                        <strong>{day.task_name}</strong>
                      </h5>
                      {day.image ? (
                        <img
                          src={`data:image/jpeg;base64,${day.image}`}
                          height="200px"
                        />
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <p>Nothing to see here!</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
