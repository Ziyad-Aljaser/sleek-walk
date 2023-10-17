import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '../config/firebase'; 

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email, password, fullName) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (fullName) {
      await updateProfile(userCredential.user, { displayName: fullName });
    }
    setCurrentUser(userCredential.user);
    return userCredential;
  }
  
  function logout() {
    return auth.signOut();
  }

  // The useEffect is used to keep track of the user's login status.
  // It automatically updates the currentUser state when the user logs in or out.
  // The "cleanup" function (unsubscribe) stops this monitoring when it's not needed to avoid memory leaks
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setCurrentUser);
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
