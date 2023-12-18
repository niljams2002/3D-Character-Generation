import { useEffect, useState } from "react";
import { HomeNavbar, NetworkBackground } from "../components";

const HomePage = () => {
  const [textChar, setTextChar] = useState("Char");
  const [textGen, setTextGen] = useState("Gen");

  const expandShrinkText = (
    initialText,
    expandedText,
    interval,
    pauseDuration,
    setText
  ) => {
    let isExpanding = true;
    let isPaused = false;
    let text = initialText;
    let index = 0;

    setInterval(() => {
      if (isExpanding && !isPaused) {
        text += expandedText[index];
        index++;
        if (index === expandedText.length) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isExpanding = false;
          }, pauseDuration);
        }
      } else if (!isExpanding) {
        text = text.slice(0, -1);
        if (text === initialText) {
          index = 0;
          isPaused = true;
          isExpanding = true;
          setTimeout(() => {
            isPaused = false;
          }, pauseDuration);
        }
      }
      setText(text);
    }, interval);
  };

  useEffect(() => {
    expandShrinkText("Char", "acter  ", 200, 2000, setTextChar);
    expandShrinkText("Gen", "eration", 200, 2000, setTextGen);
  }, []);

  return (
    <>
      <HomeNavbar />
      <NetworkBackground>
        <section id="about" className="d-flex" style={{ minHeight: "100vh" }}>
          <div className="container my-auto">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="p text-center" style={{ fontSize: "1.1rem" }}>
                  <br />
                  <br />
                  <h1 className="display-4">
                    {textChar}
                    {textGen}
                  </h1>
                </div>
                <div
                  className="p flex-fill text-center"
                  style={{ fontSize: "1.1rem" }}
                >
                  <br />
                  <p className="lead">
                    CharGen or Character Generation innovates 3D facial model
                    creation by utilizing user-provided text descriptions. This
                    user-friendly system allows customization and streamlines a
                    traditionally complex process. Advanced algorithms convert
                    text into realistic 3D models, revolutionizing industries
                    like entertainment and virtual reality
                  </p>
                </div>
                <div className="p text-center" style={{ fontSize: "1.1rem" }}>
                  <a
                    href="/generate"
                    className="btn btn-outline-light btn-lg"
                    style={{ transition: "all 0.4s ease-in-out" }}
                    role="button"
                  >
                    Start Generating
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </NetworkBackground>
    </>
  );
};

export default HomePage;
