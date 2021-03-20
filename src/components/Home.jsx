import React, { useState } from "react";
import ReactDOM from "react-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond/dist/filepond.min.css"; 

// Register the plugins
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

export default function Home(props) {
  //use states
  const [audio, setAudio] = useState([]);

  const handleAudioFile = (file) => {
    setAudio(file);
    var element = document.getElementById("upload_text").parentNode.id;
    document.getElementById(element).parentNode.classList.remove("error_audio");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (audio.length === 0) {
      var element = document.getElementById("upload_text").parentNode.id;
      document.getElementById(element).parentNode.classList.add("error_audio");
    }
  };

  return (
    <React.Fragment>
      {/* dynamic helmet for seo content update */}
      <Helmet>
        <title>Home</title>
        <meta name="Home" />
      </Helmet>
      {/* end of helmet */}
      {/* page body */}
      <div class="container-fluid">
        {/* header */}
        <Header />
        {/* end of header */}
        {/* content */}
        <div class="container-fluid">
          <div class="d-flex justify-content-center vh-100">
            <div class="col-md-6 col-sm-12 px-0 upload-container">
              <h1 class="text-center">Convert your audio to mp3</h1>
              <div class="py-md-4">
                <form class="px-sm-2 px-2 pt-5">
                  <h5>Upload your audio*</h5>
                  <FilePond
                    id="upload_audio"
                    files={audio}
                    onupdatefiles={handleAudioFile}
                    allowMultiple={false}
                    maxFiles={1}
                    name="files"
                    labelIdle='<div style="display:flex;align-items:center" id="upload_text"><p style="margin-right:15px">
                  "Click here or Drop your audio here"</p></div>'
                    acceptedFileTypes={["audio/*"]}
                    maxFileSize={"5MB"}
                    labelMaxFileSizeExceeded="File is too large"
                  />
                  <div class="d-flex flex-row-reverse justify-content-center">
                    <button
                      class="btn btn-primary mt-4 px-5"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Convert
                    </button>
                  </div>
                </form>
              </div>
              <div class="mt-5">
                <h2 class="text-center">Your convertion history</h2>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Uploaded file</th>
                      <th scope="col">Converted file</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* end of content */}
        {/* footer */}
        <Footer />
        {/* end of footer */}
      </div>
      {/* end of page body */}
    </React.Fragment>
  );
}
