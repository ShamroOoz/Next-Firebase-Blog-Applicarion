import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, googleAuthProvider, firestore } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = createContext({ user: null, username: null });

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
}

export const useAuth = () => {
  return useContext(UserContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [username, setusername] = useState(null);

  //   useEffect(() => {
  //     const unsubscribe = auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         setUser(user);
  //       } else {
  //         setUser(false);
  //       }
  //     });
  //     // Cleanup subscription on unmount
  //     return () => unsubscribe();
  //   }, []);
  
     const signInWithGoogle = async () => {
       await auth.signInWithPopup(googleAuthProvider);
    };
    
    return {
      signInWithGoogle
    user,
    username,
  };
}
