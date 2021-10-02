import Header from "./components/header";
import Login from "./components/login";
import Home from "./components/home";
import { ReactComponent as Blob1 } from "./resources/blob1.svg";
import { ReactComponent as Blob2 } from "./resources/blob2.svg";
import { ReactComponent as Blob3 } from "./resources/blob3.svg";
import "./styling/app.css";
import firebase from "firebase/app";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/UserContext";
import { useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAhKHqnnxevz3UjS6eS6mhrNNNynWe8O88",
  authDomain: "travelsite-4d5b3.firebaseapp.com",
  projectId: "travelsite-4d5b3",
  storageBucket: "travelsite-4d5b3.appspot.com",
  messagingSenderId: "430716304889",
  appId: "1:430716304889:web:0be0147f9bb0a879be5128",
  measurementId: "G-MSCY7XKFE6",
};

// Must be called before any use of firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

/**
 * Component to show the application. Switch between login and
 * home page. Also responsible for the background.
 * @returns The application
 */
const App = () => {
  const { userData } = useContext(AuthContext);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      if (userData) {
        userData.userName = user.displayName;
        userData.userEmail = user.email;
        userData.userPhotoLink = user.photoURL;
        userData.userId = user.uid;
      }
    } else {
      // User not signed in.
      return <Redirect to={"/"} />;
    }
  });

  return (
    <div className="App">
      <Header />
      <div id="blobs">
        <div className="blob">
          <Blob1 />
        </div>
        <div className="blob">
          <Blob2 />
        </div>
        <div className="blob">
          <Blob3 />
        </div>
      </div>

      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
