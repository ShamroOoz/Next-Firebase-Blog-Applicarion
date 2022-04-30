import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, firestore } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
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
  const [loading, setloading] = useState(true);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
        setloading(false);
      });
    } else {
      setUsername(null);
      setloading(false);
    }

    return unsubscribe;
  }, [user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    return await signInWithPopup(auth, provider);
  };

  const signOutMe = async () => {
    return await signOut(auth);
  };

  return {
    signInWithGoogle,
    signOutMe,
    user,
    username,
    loading,
  };
}
