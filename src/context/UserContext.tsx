import React, { useEffect, useState } from "react";
import firebase from "firebase/app";

interface userDataProps {
  userProviderId: string | null;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  userPhotoLink: string | null;
}

type ContextProps = {
  currentUser: any;
  userData: userDataProps;
  setCurrentUser: React.Dispatch<any>;
  setUserData: React.Dispatch<React.SetStateAction<userDataProps | undefined>>;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

/**
 * Context to store user information.
 * @param props
 * @returns a context containing user information.
 */
export const AuthProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<userDataProps>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const requiredData = {
          userProviderId: user.providerId,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          userPhotoLink: user.photoURL,
        };

        setUserData(requiredData);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  const context = { currentUser, userData, setCurrentUser, setUserData };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};
