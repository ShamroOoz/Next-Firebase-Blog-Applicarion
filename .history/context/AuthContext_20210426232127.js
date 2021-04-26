import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, googleAuthProvider, firestore } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = createContext();

export function ProvideAuth({ children }) {
  const authData = useProvideAuth();
  return (
    <UserContext.Provider value={authData}>
      {!authData.loading && children}
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(UserContext);
};

function useProvideAuth() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
        setloading(true);
      });
    } else {
      setUsername(null);
      setloading(true);
    }

    return unsubscribe;
  }, [user]);

  const signInWithGoogle = async () => {
    return await auth.signInWithPopup(googleAuthProvider);
  };

  const signOut = async () => {
    return await auth.signOut();
  };

  return {
    signInWithGoogle,
    signOut,
    user,
    username,
    loading,
  };
}
