import moment from "moment";
import { useSelector } from "react-redux";
import { HomeNavbar, NetworkBackground } from "../components";

function ProfilePage() {
  const user = useSelector((state) => state.user.value);
  return (
    <>
      <NetworkBackground>
        <HomeNavbar />
        <br />
        <div className="container text-center mt-5">
        <i className="bi bi-person-circle" style={{fontSize: "30vh"}}/>
          <h2 className="mt-4">Hello {user.name}!</h2>
          <br />
          <h5 className="text-white">
            Username: {user.username}
            <br />
            Email: {user.email}
            <br />
            <br />
            Joined:{" " + moment(user.joinedAt).format("LL")} at{" "}
            {moment(user.joinedAt).format("LTS") +
              " " +
              moment(user.joinedAt).format("Z")}
          </h5>
        </div>
      </NetworkBackground>
    </>
  );
}

export default ProfilePage;
