import { useState, useEffect } from "react";
import {
  FaceModelRender,
  BodyModelRender,
  HomeNavbar,
  NetworkBackground,
} from "../components";

import axios from "axios";

function HomePage() {
  const [mode, setMode] = useState("body");
  const [generation, setGeneration] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (!id) {
      window.location.href = "/history";
    } else {
      axios
        .post(
          "/api/generations/fetch",
          { generationID: id },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data && response.data.fetched) {
            console.log(response.data);
            setGeneration(response.data.generation);
          } else {
            window.location.href = "/history";
          }
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/history";
        });
    }
  }, []);

  return (
    <>
      <NetworkBackground style={{ height: "auto" }}>
        <HomeNavbar />
        <br />
        <br />
        <br />
        <div className="d-flex flex-row justify-content-between">
          <div className="p-2">
            <h1 className="display mx-5">Generation Viewer</h1>
          </div>
          <div className="p-2 mx-5">
            <div
              className="btn-group mx-2"
              role="group"
              style={{ width: "15vw" }}
            >
              <button
                className={
                  "btn btn-outline-light" + (mode === "face" ? " active" : "")
                }
                onClick={() => setMode("face")}
              >
                Face
              </button>
              <button
                className={
                  "btn btn-outline-light" + (mode === "body" ? " active" : "")
                }
                onClick={() => setMode("body")}
              >
                Body
              </button>
            </div>
            <a
              href={"/api/generations/" + generation?._id + "/zip"}
              className="btn btn-success"
              download
            >
              <i className="bi bi-download" />
            </a>
          </div>
        </div>

        <br />
        <div className="row mx-5">
          <div className="col-md-6 ">
            {generation && generation._id && (
              <img
                {...(mode === "face"
                  ? {
                      src:
                        "/api/generations/" + generation._id + "/faceImage.png",
                      alt: "Face",
                    }
                  : {
                      src: "/api/generations/" + generation._id + "/body.png",
                      alt: "Body",
                    })}
                className="img-fluid rounded mx-auto d-block"
                style={{
                  height: "60vh",
                  width: "auto",
                }}
              />
            )}
          </div>
          <div className="col-md-6 " style={{ height: "60vh" }}>
            {mode === "face" ? (
              <FaceModelRender generation={generation} />
            ) : (
              <BodyModelRender generation={generation} />
            )}
          </div>
        </div>
      </NetworkBackground>
    </>
  );
}

export default HomePage;
