import axios from "axios";
import { useState, useEffect } from "react";

import { HomeNavbar, NetworkBackground } from "../components";
import PastGenCard from "../components/PastGenCard.component";

function HistoryPage() {
  const [generations, setGenerations] = useState([]);
  const [generationID, setGenerationID] = useState(null);

  useEffect(() => {
    axios
      .post("/api/generations/list")
      .then((response) => {
        if (response.data.listed && response.data.generations) {
          setGenerations(response.data.generations);
        } else {
          console.error("Failed to fetch generations");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <NetworkBackground style={{ minHeight: "100vh" }}>
        <HomeNavbar />
        <br />
        <h1 className="display mt-5 mx-5">Past Generations</h1>
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-md-8"
              style={{ maxHeight: "70vh", overflowY: "scroll" }}
            >
              <ul className="list-unstyled">
                {generations.length === 0 ? (
                      <h3 className="text-center text-white">
                        No generations have been generated yet
                      </h3>
                ) : null}
                {generations.map((generation, index) => {
                  return (
                    <li key={index}>
                      <PastGenCard
                        generationID={generation}
                        index={index}
                        setHoveredImage={setGenerationID}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            { generations.length > 0 ? (
            <div className="col-md-4">
              {
                <div
                  className="card text-center shadow border-white p-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(5px) saturate(180%)",
                    height: "100%",
                    maxHeight: "70vh",
                  }}
                >
                  <h3 className="card-title text-white mt-2">Preview</h3>
                  {generationID ? (
                    <img
                      src={
                        "/api/generations/" + generationID + "/faceImage.png"
                      }
                      alt="Face"
                      className="img-fluid rounded my-auto mx-auto d-block"
                      style={{
                        width: "80%",
                        height: "auto",
                        opacity: generationID ? 1 : 0,
                        transition: "all 1s ease-in",
                      }}
                    />
                  ) : (
                    <div
                      className="card-body"
                      style={{ transition: "all 3s ease" }}
                    >
                      <p className="card-text text-white">
                        Hover over a generation to see a preview
                      </p>
                    </div>
                  )}
                </div>
              }
            </div>
            ) : null}
          </div>
        </div>
      </NetworkBackground>
    </>
  );
}

export default HistoryPage;
