import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpCardGlass() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const signUpUser = async (e) => {
    e.preventDefault();

    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (newUser.username.includes(" ")) {
      setErrorMessage("Username cannot contain spaces.");
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    await axios
      .post("api/account/signup", newUser)
      .then((res) => {
        setErrorMessage(null);
        if (res.data.created) {
          setSuccessMessage(res.data.message + " Please sign in.");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setErrorMessage(res.data.message + res.data.db_message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.db_message) {
          setErrorMessage(err.response.data.sb_message);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div
      id="signUpCard"
      className="text-black card shadow position-absolute top-50 start-50 translate-middle ml-5"
      style={{
        width: "30%",
        minWidth: "300px",
        minHeight: "300px",
        borderRadius: "30px",
        background: "transparent",
        backdropFilter: "blur(5px)",
        color: "white",
        border: "2px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="card-body">
        <h1 className="card-title mb-4 text-center text-white">Sign Up</h1>
        <div className="card-text">
          <form onSubmit={signUpUser} style={{ maxWidth: "100%" }}>
            <div className="form-floating mb-1">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="name"
                required
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-1">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="email"
                required
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-1">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="username"
                required
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
              <label htmlFor="name">Username</label>
            </div>
            <div className="form-floating input-group mb-1">
              <input
                type={passwordType}
                className="form-control"
                id="password"
                required
                minLength="6"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <label htmlFor="password">Password</label>
              <button
                className="position-relative btn btn-outline-light"
                type="button"
                style={{
                  border: "1px solid #ced4da",
                  minHeight: "calc(3.5rem + 2px)",
                }}
                onClick={() => {
                  passwordType === "password"
                    ? setPasswordType("text")
                    : setPasswordType("password");
                }}
              >
                {passwordType === "password" ? (
                  <i className="bi bi-eye" />
                ) : (
                  <i className="bi bi-eye-slash" />
                )}
              </button>
            </div>
            <div className="form-floating input-group">
              <input
                type={confirmPasswordType}
                className="form-control"
                id="confirmPassword"
                required
                minLength="6"
                value={newUser.confirmPassword}
                onChange={(e) =>
                  setNewUser({ ...newUser, confirmPassword: e.target.value })
                }
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <button
                className="position-relative btn btn-outline-light"
                type="button"
                style={{
                  border: "1px solid #ced4da",
                  minHeight: "calc(3.5rem + 2px)",
                }}
                onClick={() => {
                  confirmPasswordType === "password"
                    ? setConfirmPasswordType("text")
                    : setConfirmPasswordType("password");
                }}
              >
                {confirmPasswordType === "password" ? (
                  <i className="bi bi-eye" />
                ) : (
                  <i className="bi bi-eye-slash" />
                )}
              </button>
            </div>
            <br />
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <button
              className="w-100 btn btn-lg btn-outline-light"
              type="submit"
              style={{
                border: "1px solid #ced4da",
                transition: "all 0.5s ease-in-out",
                borderRadius: "30px",
              }}
            >
              Create An Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpCardGlass;
