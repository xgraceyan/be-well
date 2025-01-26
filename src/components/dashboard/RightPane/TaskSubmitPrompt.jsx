import React, { useState } from "react";
import imageToBase64 from "image-to-base64/browser";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function TaskSubmitPrompt({ id, taskID, onTaskDelete, petID }) {
  const [imgUrl, setImgUrl] = useState("");
  const [file, setFile] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [verified, setVerified] = useState(0); // 0 = not submitted; 1 = false; 2 = true
  const [encodedFile, setEncodedFile] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setImgUrl(e.target.value);
    console.log(e);
    const curr_file = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0]);
    setFilePreview(curr_file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submitted");
    // verifyImage(file);

    imageToBase64(filePreview) // Path to the image
      .then((response) => {
        setEncodedFile(response);
        console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
        verifyImage(response);
      })
      .catch((error) => {
        console.log(error); // Logs an error if there was one
      });
  };

  const verifyImage = async (img) => {
    var bodyFormData = new FormData();
    bodyFormData.append("uploaded_image", img);

    try {
      const res = await axios.post("/api/image", bodyFormData);
      if (res.data.detected) {
        // Delete the task from Supabase
        const { error } = await supabase
          .from("Tasks Log") // Replace "tasks" with your actual table name
          .update({ completed: "true", image: img })
          .eq("task_id", taskID); // Use the `id` prop passed to the component

        if (error) {
          console.error("Error deleting task:", error);
          return;
        } else {
          console.log(`Task deleted successfully: ` + taskID);

          onTaskDelete(taskID); // Remove the task from the UI

          // increase the mood of the pet by 1 as long as the mood is less than 5
          const { data, error } = await supabase
            .from("Pet")
            .select("mood")
            .eq("pet_id", petID);

          if (error) {
            console.error("Error fetching pet mood:", error);
            return;
          }

          const mood = data[0].mood;

          if (mood < 5) {
            const { data, error } = await supabase
              .from("Pet")
              .update({ mood: mood + 1 })
              .eq("pet_id", petID);

            if (error) {
              console.error("Error updating pet mood:", error);
              return;
            }
          }

          // refresh the entire page
          window.location.reload();

          setVerified(2); // Mark as verified
        }

        setVerified(2); // Mark as verified
      } else {
        setVerified(1); // Mark as not verified
      }
    } catch (error) {
      console.error("Error verifying image or deleting task:", error);
    }
  };

  return (
    <div class="modal fade" id={"task-modal-" + id}>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <strong>Upload image</strong>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {verified == 2 && (
            <div className="modal-body">
              <div class="alert alert-success" role="alert">
                Image is verified!
              </div>
            </div>
          )}
          {verified != 2 && (
            <form onSubmit={handleSubmit}>
              <div class="modal-body">
                {verified == 1 && (
                  <div class="alert alert-danger" role="alert">
                    Image was not verified — try again!
                  </div>
                )}
                <span className="task-instr-label">
                  Upload your image
                </span>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleChange}
                />
                <div className="image-container d-flex justify-content-center">
                  {imgUrl && (
                    <img src={filePreview} width="150px" className="mt-3" />
                  )}
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
