import Nav from "react-bootstrap/Nav";

import { LandNavbar, AboutCard, NetworkBackground } from "../components/";
import CharGenLogoFull from "../static/CharGenLogo-White.png";
import HLD from "../static/CharGen-HLD-Diagram.png";

function LandPage() {
  const team = [
    {
      name: "Mitul Joby",
      srn: "PES2UG20CS199",
      image: "https://avatars.githubusercontent.com/u/73733877?v=4",
      about: "I like making, tinkering, breaking and disecting things!",
      github: "https://github.com/Mitul-Joby",
      linkedin: "https://www.linkedin.com/in/mituljoby/",
    },
    {
      name: "Nihal Chengappa PA",
      srn: "PES2UG20CS224",
      image:
        "https://media.licdn.com/dms/image/D5603AQEhmtk4aUmBKQ/profile-displayphoto-shrink_400_400/0/1685777263636?e=1704931200&v=beta&t=ss9JRRm8Ght6eE3U9wVsoLKlxS6ETM0rhGVJUtJyPnE",
      about: "Turning caffeine into code, one keyboard at a time.",
      github: "https://github.com/NihalChengappa",
      linkedin: "https://www.linkedin.com/in/nihal-chengappa-9198831b6/",
    },
    {
      name: "Nilesh Ravichandran",
      srn: "PES2UG20CS225",
      image:
        "https://media.licdn.com/dms/image/D5603AQHC61WGk5xbrw/profile-displayphoto-shrink_400_400/0/1699439763758?e=1704931200&v=beta&t=NABcTt7RbNo___mO0SsyiRbGqlyr7m9T8actsLIVeoI",
      about: "Eager in exploring new technologies!",
      github: "https://github.com/niljams2002",
      linkedin: "https://www.linkedin.com/in/nileshrn/",
    },
    {
      name: "Pranav Rebala",
      srn: "PES2UG20CS248",
      image: "https://avatars.githubusercontent.com/u/94732433?v=4",
      about:
        "Tech enthusiast with a passion for innovation and cutting-edge technology",
      github: "https://github.com/PranavR-11",
      linkedin: "https://www.linkedin.com/in/pranav-rebala-061b43237/",
    },
  ];

  return (
    <>
      <NetworkBackground>
        <LandNavbar />
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div
            className="d-flex flex-column align-items-center"
            style={{ width: "100%" }}
          >
            <img
              src={CharGenLogoFull}
              alt="CharGen Logo"
              style={{ height: "30vh", width: "auto" }}
            />
            <div
              className="text-white text-center my-3"
              style={{ fontSize: "1.5rem" }}
            >
              A 3D Character Mesh Generator from textual descriptions
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <Nav.Link href="#about" className="text-white text-center">
              <button className="btn btn-outline-light">LEARN MORE</button>
            </Nav.Link>
          </div>
        </div>
      </NetworkBackground>

      <section
        id="about"
        className="d-flex"
        style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
      >
        <div className="ms-4 me-3 my-5">
          <div className="d-flex flex-column">
            <div
              className="p"
              style={{ fontSize: "1.1rem", textAlign: "justify" }}
            >
              <h1 className="display-4 mt-4">Character Generation</h1>
            </div>
            <div className="p flex-fill">
              <br />
              <p
                className="lead"
                style={{ fontSize: "1.5rem", textAlign: "justify" }}
              >
                The aim of this project is to develop a system that takes
                user-provided textual descriptions and turns them into realistic
                3D facial representations. There is currently a gap in the field
                of creating 3D facial models from text descriptions. It takes a
                lot of effort and time to create 3D facial models requiring
                professional experience, hence the procedure has traditionally
                been difficult. To address these issues, the proposed system
                leverages generation of highly realistic 3D facial models from
                textual descriptions. The system provides a user-friendly
                interface that allows users to easily input text and customize
                the generated 3D model. Additionally, the system is designed to
                handle errors effectively and provide useful error messages to
                users in case of input errors or technical issues.
              </p>
            </div>

            <h1 className="display-4 mt-4">Features</h1>
        <br />
        <ul className="list-unstyled">
          <li className="lead">
            <i className="bi bi-check-circle-fill text-success me-2" />
            Generate 3D facial models as well as 3D body models
          </li>
          <li className="lead">
            <i className="bi bi-check-circle-fill text-success me-2" />
            View the generated 3D model
          </li>
          <li className="lead">
            <i className="bi bi-check-circle-fill text-success me-2" />
            Download the generated 3D model
          </li>
          <li className="lead">
            <i className="bi bi-check-circle-fill text-success me-2" />
            View past generations
          </li>
        </ul>
            <br />

            <h1 className="display-4 mt-4">High Level Design</h1>

            <img
              src={HLD}
              alt="CharGen HLD"
              className="img-fluid rounded my-auto mx-auto d-block"
              style={{
                width: "75%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </section>

      <section
        id="team"
        className="d-flex"
        style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
      >
        <div className="container text-center my-5">
          <div className="row justify-content-center">
            <h1 className="display-4">Our Team</h1>
            <p className="lead">
              We are a team of 4 students from PES University, Bangalore
            </p>
          </div>
          <div className="row justify-content-center">
            {team.map((member) => {
              return (
                <div className="col-md-3 p-2" key={member.srn}>
                  <AboutCard
                    name={member.name}
                    srn={member.srn}
                    image={member.image}
                    about={member.about}
                    github={member.github}
                    linkedin={member.linkedin}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div
        className="text-white text-center bottom-0 bg-black"
        style={{ maxWidth: "100vw" }}
      >
        Copyright © CharGen 2023
      </div>
    </>
  );
}

export default LandPage;
