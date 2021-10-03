import "firebase/auth";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useEffect } from "react";
import HeaderSignedOut from "./headerSignedOut";

/**
 * Component responsible for showing the different
 * possibilities for login, and for logging in users.
 * @returns Login forms
 */
const Login = () => {
  // ui.start must be called after rendering, because it requires
  // the firebaseui-auth-containre to be rendered.
  useEffect(() => {
    // Initialize the FirebaseUI Widget using Firebase.
    // If we allready have an AuthUI, retreive that.
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    // Says which signin-methods to use
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
      },
      signInSuccessUrl: "/home",
    });
  });
  return (
    <>
      <HeaderSignedOut />
      <div id="firebaseui-auth-container"></div>
    </>
  );
};

export default Login;
