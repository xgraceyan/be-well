import React, { useEffect, useState } from "react";
import moment from "moment";
import { supabase } from "../../../supabase/supabaseClient";

export default function MedsModal() {
  const [medsData, setMedsData] = useState();
  const [userId, setUserId] = useState(null);

  let startTimestamp = moment().hour(0).minute(0).toISOString(true);
  let endTimestamp = moment().hour(23).minute(59).second(59).toISOString(true);

  startTimestamp = startTimestamp.substring(0, startTimestamp.length - 6);

  endTimestamp = endTimestamp.substring(0, endTimestamp.length - 6);

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user session:", error);
        return;
      }

      if (session) {
        console.log("User ID:", session.user.id);
        setUserId(session.user.id); // Set the user_id from the session
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const getMedsData = async () => {
      if (!userId) return; 

      try {
        console.log("INSIDE MEDS DATA");
        console.log("USER ID:", userId);
        
        const { data, error } = await supabase
          .from("Tasks Log")
          .select("*")
          .eq("task_type", "Medication")
          .eq("pet_id", userId) // Filter by user_id
          .gte("date", startTimestamp)
          .lt("date", endTimestamp)
          .order("date", { ascending: false });

        if (error) {
          console.error("Error fetching medication tasks:", error);
        } else {
          setMedsData(data);
        }
      } catch (err) {
        console.error("Unexpected error fetching medication tasks:", err);
      }
    };

    getMedsData();
  }, [medsData]);

  return (
    <div class="modal fade" id="meds-modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <strong>Today's Schedule!</strong>
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
              {medsData && medsData.length > 0 ? (
                medsData.map((med) => {
                  return (
                    <div className="med-info mb-4">
                      <strong>{med.task_name}</strong> at{" "}
                      {moment(med.date.toString()).utc().format("LT")} —{" "}
                      {console.log(med) && med.completed ? (
                        <span className="text-success">Done!</span>
                      ) : (
                        <span className="text-danger">Not Yet Done</span>
                      )}
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
