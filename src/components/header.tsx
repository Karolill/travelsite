import { ReactComponent as SVGLogo } from "../resources/logo.svg";
import MainButton from "./mainButton";
import "../styling/headerStyle.css";
import { AuthContext } from "../context/UserContext";
import { useContext } from "react";
import firebase from "firebase/app";

const Header = () => {
  const { setCurrentUser, setUserData } = useContext(AuthContext);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setCurrentUser && setCurrentUser(null);
        const changedUserData = {
          userProviderId: null,
          userId: null,
          userName: null,
          userEmail: null,
          userPhotoLink: null,
        };
        setUserData && setUserData(changedUserData);
      })
      .catch((error) => {
        // An error happened.
        console.log(
          "Were not able to sign out because of the following: " + error
        );
      });
  };

  if (window.location.pathname !== "/") {
    return (
      <header>
        <SVGLogo />
        <div id="right-side-header">
          <MainButton text={"New trip"} />
          <button className="transparent-button" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <SVGLogo />
      </header>
    );
  }
};

export default Header;
