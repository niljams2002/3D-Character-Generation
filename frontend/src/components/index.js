import Loading from "./Loading.component";
import AboutCard from "./AboutCard.component";
import LandNavbar from "./LandNavbar.component";
import HomeNavbar from "./HomeNavbar.component";
import PastGenCard from "./PastGenCard.component";
import SignOutButton from "./SignOutButton.component";
import FaceModelRender from "./FaceModelRender.component";
import BodyModelRender from "./BodyModelRender.component";
import SignInCardWhite from "./SignInCardWhite.component";
import SignUpCardWhite from "./SignUpCardWhite.component";
import SignInCardGlass from "./SignInCardGlass.component";
import SignUpCardGlass from "./SignUpCardGlass.component";
import NetworkBackground from "./NetworkBackground.component";

const glassMode = true;
var SignInCard = (glassMode) ? SignInCardGlass : SignInCardWhite;
var SignUpCard = (glassMode) ? SignUpCardGlass : SignUpCardWhite;

export { Loading, AboutCard, LandNavbar, HomeNavbar,  PastGenCard, SignOutButton, FaceModelRender, BodyModelRender, SignInCard, SignUpCard, NetworkBackground };
