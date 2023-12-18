import axios from "axios";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/features/userSlice";

function SignOutButton() {
  const dispatch = useDispatch();

  const signOutRequest = async (e) => {
    e.preventDefault();
    await axios
      .post("api/account/signout")
      .then(() => {
        dispatch(signOut());
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="btn btn-outline-light mx-2"
        style={{ transition: "all 0.4s ease-in-out" }}
        onClick={signOutRequest}
      >
        Sign Out
      </div>
    </>
  );
}

export default SignOutButton;
