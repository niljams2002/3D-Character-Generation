import { useState, useEffect } from "react";
import { HomeNavbar, NetworkBackground } from "../components";

function GeneratePage() {
  const [generation, setGeneration] = useState(null);
  const [error, setError] = useState(null);

  const [featuresFaceSelected, setFeaturesFaceSelected] = useState({
    eyes: "Brown",
    hair: "Black",
    skin: "Brown",
    lips: "Thin",
    nose: "Straight",
    chin: "Double",
    cheeks: "High",
    eyebrows: "Arched",
    "facial hair": "None",
    "face shape": "Oval",
    age: "Young",
  });

  const [featuresBodySelected, setFeaturesBodySelected] = useState({
    gender: "Male",
    height: "Average",
    weight: "Average",
    build: "Average",
    hair: "Short",
  });

  const featuresFace = [
    {
      title: "Eyes",
      options: ["Brown", "Black", "Blue", "Green", "Hazel"],
    },
    {
      title: "Hair",
      options: ["Brown", "Black", "Blonde", "Red", "Brunette"],
    },
    {
      title: "Skin",
      options: ["White", "Black", "Brown", "Tan", "Olive", "Pale"],
    },
    {
      title: "Lips",
      options: ["Thin", "Full"],
    },
    {
      title: "Nose",
      options: ["Straight", "Curved", "Pointed"],
    },
    {
      title: "Chin",
      options: ["Double", "Single"],
    },
    {
      title: "Cheeks",
      options: ["High", "Low", "Rosy"],
    },
    {
      title: "Eyebrows",
      options: ["Arched", "Straight", "Bushy"],
    },
    {
      title: "Facial Hair",
      options: [
        "None",
        "Beard",
        "Moustache",
        "Goatee",
        "Sideburns",
        "Full Beard",
      ],
      // eslint-disable-next-line no-unused-vars
      condition: (featuresBodySelected, featuresFaceSelected) => {
        return featuresBodySelected.gender == "Male";
      },
    },
    {
      title: "Face Shape",
      options: ["Oval", "Round", "Square", "Heart"],
    },
    {
      title: "Age",
      options: ["Young", "Middle-Aged", "Old"],
    },
  ];

  const featuresBody = [
    {
      title: "Gender",
      options: ["Male", "Female"],
    },
    {
      title: "Height",
      options: ["Average", "Tall", "Short"],
    },
    {
      title: "Weight",
      options: ["Average", "Thin", "Fat"],
    },
    {
      title: "Build",
      options: ["Average", "Muscular", "Athletic"],
    },
    {
      title: "Hair",
      options: ["Short", "Long", "Bald", "Wavey"],
    },
  ];

  const sendGenerationRequest = () => {
    console.log("Sending generation request...");

    const features = {
      face: featuresFaceSelected,
      body: featuresBodySelected,
    };

    fetch("/api/generations/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features: features }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.created && data.generation) {
          window.location.href = `/generation?id=${data.generation._id}`;
        } else {
          if (data && data.error) {
            setError(data.message);
          } else {
            setError(
              "The model server is currently offline.\nPlease try again later."
            );
            setGeneration(false);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setError(
          "The model server is currently offline.\nPlease try again later."
        );
        setGeneration(false);
      });
  };

  const generateCharacter = (e) => {
    e.preventDefault();
    setGeneration(true);
    setError(null);

    fetch("/api/generations/check", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          if (data.status === "up") {
            sendGenerationRequest();
          } else {
            setError(
              "The model server is currently offline.\nPlease try again later."
            );
            setGeneration(false);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setError(
          "The model server is currently offline.\nPlease try again later."
        );
        setGeneration(false);
      });
  };

  useEffect(() => {
    const selectDropdowns = document.querySelectorAll(".feature-select");

    selectDropdowns.forEach((select) => {
      select.addEventListener("click", () => {
        select.firstChild.setAttribute("disabled", "disabled");
      });
    });
  }, []);

  return (
    <>
      <NetworkBackground style={{ minHeight: "100vh" }}>
        <HomeNavbar />
        <br />
        <form className="container mt-5" onSubmit={generateCharacter}>
          <div className="row">
            {/* Left column */}
            <div className="col-4">
              <div className="d-flex flex-column">
                <h3 className="text-center">Body Features</h3>
                <div style={{ maxHeight: "75vh" }}>
                  {featuresBody.map((feature, index) => (
                    <div className="mx-3 my-3" key={index}>
                      <label
                        htmlFor={`featureSelect${index}`}
                        style={{ fontWeight: "bold" }}
                      >
                        {feature.title}
                      </label>
                      <select
                        className="form-control feature-select custom-dropdown"
                        id={`featureSelect${index + featuresFace.length}`}
                        defaultValue={
                          featuresBodySelected[feature.title.toLowerCase()]
                        }
                        onChange={(e) => {
                          setFeaturesBodySelected({
                            ...featuresBodySelected,
                            [feature.title.toLowerCase()]: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select an option</option>
                        {feature.condition &&
                        !feature.condition(
                          featuresBodySelected,
                          featuresFaceSelected
                        ) ? (
                          <option key="none">None</option>
                        ) : (
                          feature.options.map((option, subIndex) => (
                            <option key={subIndex}>{option}</option>
                          ))
                        )}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center column */}
            <div className="col-4">
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="/src/static/CharGenLogo-White.png"
                    alt="Face"
                    className="img-fluid rounded my-auto mx-auto d-block"
                    style={{
                      width: "200px",
                      height: "auto",
                      opacity: 1,
                      transition: "all 1s ease-in",
                    }}
                  />
                  {generation ? (
                    <div className="d-flex flex-column align-items-center">
                      <h3 className="text-center text-light mt-3">
                        Generating
                      </h3>
                      <div
                        className="spinner-border text-light mt-3"
                        role="status"
                      />

                      <h6 className="text-center text-light mt-3">
                        This may take a few minutes.
                        <br />
                        Please do not refresh the page.
                      </h6>
                    </div>
                  ) : (
                    <button
                      className="btn btn-lg btn-outline-light mt-3"
                      style={{ width: "300px" }}
                      type="submit"
                    >
                      Generate
                    </button>
                  )}
                  {error ? (
                    <div className="alert alert-danger mt-3 text-center">
                      {error}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="col-4 align-items-end">
              <div className="d-flex flex-column">
                <h3 className="text-center">Face Features</h3>
                <div style={{ maxHeight: "75vh", overflowY: "scroll" }}>
                  {featuresFace.map((feature, index) => (
                    <div className="mx-3 my-3" key={index}>
                      <label
                        htmlFor={`featureSelect${index}`}
                        style={{ fontWeight: "bold" }}
                      >
                        {feature.title}
                      </label>
                      <select
                        className="form-control feature-select custom-dropdown"
                        id={`featureSelect${index}`}
                        defaultValue={
                          featuresFaceSelected[feature.title.toLowerCase()]
                        }
                        onChange={(e) => {
                          setFeaturesFaceSelected({
                            ...featuresFaceSelected,
                            [feature.title.toLowerCase()]: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select an option</option>
                        {feature.condition &&
                        !feature.condition(
                          featuresBodySelected,
                          featuresFaceSelected
                        ) ? (
                          <option key="none">None</option>
                        ) : (
                          feature.options.map((option, subIndex) => (
                            <option key={subIndex}>{option}</option>
                          ))
                        )}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </NetworkBackground>
    </>
  );
}

export default GeneratePage;
