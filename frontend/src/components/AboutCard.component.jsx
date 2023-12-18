import PropTypes from "prop-types";

AboutCard.propTypes = {
  name: PropTypes.string.isRequired,
  srn: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
};

function AboutCard({ name, srn, image, about, github, linkedin }) {
  return (
    <div className="card my-2" style={{ height: "100%" }}>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ height: "100%" }}
      >
        <div className="row">
          <img src={image} className="card-img-top" alt={name} />
          <h5 className="card-title mt-3">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{srn}</h6>
          <p className="card-text">{about}</p>
        </div>
        <div className="row">
          <div className="card-body">
            <a
              href={github}
              className="card-link"
              title={name + "'s Github"}
              rel="noreferrer"
              target="_blank"
            >
              <img src="src/static/GitHub-Logo.png" alt="Github" height="56" />
            </a>
            <a
              href={linkedin}
              className="card-link"
              title={name + "'s LinkedIn"}
              rel="noreferrer"
              target="_blank"
            >
              <img
                src="src/static/LinkedIn-Logo.png"
                alt="LinkedIn"
                height="40"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
