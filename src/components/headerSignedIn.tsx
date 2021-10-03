import { ReactComponent as SVGLogo } from "../resources/logo.svg";
import MainButton from "./mainButton";
import "../styling/headerStyle.css";
import { AuthContext } from "../context/UserContext";
import { useContext } from "react";
import firebase from "firebase/app";
import { useLocation } from "react-router-dom";

/**
 * Header for when we are signed in. I have two separate
 * headers because the header depends on the route, and
 * using redirect causes the header to render wrong if
 * I just use window.location.pathname to decide which
 * buttons should be in the header.
 * @returns a header.
 */
const HeaderSignedIn = () => {
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
};

export default HeaderSignedIn;
