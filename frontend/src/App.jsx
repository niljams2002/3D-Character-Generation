import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Loading } from "./components";
import { signIn, signOut } from "./redux/features/userSlice";
import {
  HomePage,
  LandPage,
  SignInPage,
  SignUpPage,
  ProfilePage,
  GeneratePage,
  HistoryPage,
  GenerationPage,
} from "./pages";

const ProtectedRoute = () => {
  const signedIn = useSelector((state) => state.user.signedIn);
  if (signedIn == null) {
    return <Loading />;
  }
  return signedIn ? <Outlet /> : <Navigate to="/signin" />;
};

function App() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const checkSignInStatus = async () => {
    try {
      const response = await axios.post("api/account/check", {
        withCredentials: true,
      });
      if (response.data && response.data.signedIn) {
        dispatch(signIn(response.data.user));
      } else {
        dispatch(signOut());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkSignInStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Routes>
        {user ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Route path="/" element={<LandPage />} />
        )}

        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />

        <Route element={<ProtectedRoute />}>
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/generate" element={<GeneratePage />} />
          <Route exact path="/history" element={<HistoryPage />} />
          <Route
            exact
            path="/generation"
            element={<GenerationPage generationID={null} />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
