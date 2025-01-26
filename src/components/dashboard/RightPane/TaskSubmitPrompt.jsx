import React, { useState } from "react";
import imageToBase64 from "image-to-base64/browser";
import axios from "axios";

export default function TaskSubmitPrompt({ id }) {
  const [imgUrl, setImgUrl] = useState("");
  const [file, setFile] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [verified, setVerified] = useState(0); // 0 = not submitted; 1 = false; 2 = true

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
        console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
        verifyImage(response);
      })
      .catch((error) => {
        console.log(error); // Logs an error if there was one
      });
  };

  const verifyImage = (img) => {
    var bodyFormData = new FormData();
    // bodyFormData.append("text", "hello wrld");
    bodyFormData.append("uploaded_image", img);
    axios
      .request({
        method: "post",
        url: "/api/image",
        data: bodyFormData,
      })
      .then((res) => {
        if (res.data.detected) {
          setVerified(2);
        } else {
          setVerified(1);
        }
      }),
      (error) => {
        console.log(error);
      };
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
