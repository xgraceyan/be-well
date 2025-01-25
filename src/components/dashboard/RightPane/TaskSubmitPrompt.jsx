import React, { useState } from "react";

export default function TaskSubmitPrompt(props) {
  const [imgUrl, setImgUrl] = useState("");
  const [file, setFile] = useState("");

  const { taskId } = props;

  const convertToBase64 = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("called: ", reader);
      console.log(">>>64", reader.result);
    };
  };

  const handleChange = (e) => {
    e.preventDefault();
    setImgUrl(e.target.value);
    console.log(e);
    const curr_file = URL.createObjectURL(e.target.files[0]);
    setFile(curr_file);
    console.log(curr_file);
    convertToBase64(curr_file);
  };

  return (
    <div class="modal fade" id="task-modal">
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
          <div class="modal-body">
            <form action="">
              <label for="formFile" class="form-label">
                Upload your image
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleChange}
              />
            </form>
            <div className="image-container d-flex justify-content-center">
              {imgUrl && <img src={file} width="150px" className="mt-3" />}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
