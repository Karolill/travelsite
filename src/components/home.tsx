import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import HeaderSignedIn from "./headerSignedIn";
import firebase from "firebase/app";

interface HomeProps {
  storageRef: firebase.storage.Reference;
}

/**
 * Home page. Here one will see a collection of all
 * albums created. And a user should be able to create
 * new albums and edit old ones.
 * @returns A home page.
 */
const Home = ({ storageRef }: HomeProps) => {
  const { currentUser } = useContext(AuthContext);

  // If you are not loged in, redirect to the login page. Could not use
  // firebase.auth().currentUser because this would throw a user out
  // before being logged in. Happened because Home rendered before
  // firebase.auth().currentUser was set.
  if (!currentUser) {
    return <Redirect to={"/"} />;
  }

  const clickUpload = () => {
    console.log("Clickling");
    // *** TRY TO SAVE AN IMAGE TO THE SERVER ***
    // Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = storageRef.child("images/mountains.jpg");

    // Must turn image into e.g. blob before saving it:
    fetch("./resources/bilde2.jpg")
      .then((response) => response.blob())
      .then((blob) => {
        // 'file' comes from the Blob or File API
        mountainImagesRef.put(blob).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      });

    // *** DONE WITH MY ATTEMPT ***
  };

  return (
    <>
      <HeaderSignedIn />
      <h1>HOME</h1>
      <button onClick={() => clickUpload()}>Click to upload</button>
    </>
  );
};

export default Home;
