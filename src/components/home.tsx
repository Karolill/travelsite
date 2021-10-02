import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

/**
 * Home page. Here one will see a collection of all
 * albums created. And a user should be able to create
 * new albums and edit old ones.
 * @returns A home page.
 */
const Home = () => {
  const { currentUser } = useContext(AuthContext);

  // If you are not loged in, redirect to the login page. Could not use
  // firebase.auth().currentUser because this would throw a user out
  // before being logged in. Happened because Home rendered before
  // firebase.auth().currentUser was set.
  if (!currentUser) {
    return <Redirect to={"/"} />;
  }
  return <div>home</div>;
};

export default Home;
