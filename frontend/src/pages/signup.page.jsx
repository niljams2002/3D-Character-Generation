import { Link } from "react-router-dom";

import { SignUpCard, NetworkBackground } from "../components";
import CharGenLogo from "../static/CharGenFullLogo-White.png";

function SignUpPage() {
  return (
    <>
      <NetworkBackground>
        <Link to="/" className="top-0 position-absolute my-4 text-center w-100">
          <img
            src={CharGenLogo}
            alt="CharGen Logo"
            style={{ minWidth: "200px", width: "30vw", maxWidth: "300px" }}
          />
        </Link>
        <SignUpCard />
        <footer className="text-white text-center position-absolute bottom-0 start-50 translate-middle-x">
          <div
            className="card text-white text-center start-50 translate-middle-x"
            style={{
              borderRadius: "30px 30px 0px 0px",
              borderColor: "transparent",
              backgroundColor: "#000000",
              width: "100vw",
              fontSize: "0.7rem",
            }}
          >
            &nbsp;This website uses cookies to store session data.&nbsp;
            <br />
            &nbsp;&nbsp;&nbsp;By continuing to use this website, you consent to
            our use of cookies.&nbsp;&nbsp;&nbsp;
          </div>
        </footer>
      </NetworkBackground>
    </>
  );
}
export default SignUpPage;
