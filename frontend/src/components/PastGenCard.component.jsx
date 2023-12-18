import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

PastGenCard.propTypes = {
  generationID: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setHoveredImage: PropTypes.func.isRequired,
};

function PastGenCard({ generationID, index, setHoveredImage }) {
  const [hovered, setHovered] = useState(false);
  const cardStyle = `card mb-3 ${hovered ? "shadow border-white" : ""}`;

  const hover = () => {
    setHovered(true);
    setHoveredImage(generationID);
  };

  const unhover = () => {
    setHovered(false);
    setHoveredImage(null);
  };

  return (
    <>
      <div
        className={cardStyle}
        id={`card${index}`}
        onMouseEnter={() => hover()}
        onMouseLeave={() => unhover()}
        style={{
          transition: "all 0.5s ease",
          backgroundColor: hovered
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(5px) saturate(180%)",
        }}
      >
        <div className="card-header d-flex justify-content-between align-items-center text-white">
          <h5 className="card-title mb-0">Generation {index + 1}</h5>
          <div className="btn-group text-white">
            <Link
              to={"/generation?id=" + generationID}
              className="btn btn-dark"
            >
              View Generation
            </Link>
            <a
              href={"/api/generations/" + generationID + "/zip"}
              className="btn btn-success"
              download
            >
              <i className="bi bi-download" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default PastGenCard;
