import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '../config/firebase'; 

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate(); // <-- Get the navigate function

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
    return auth.signOut().then(() => {
      navigate('/login'); // Used to navigate to login after logout
    });
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
