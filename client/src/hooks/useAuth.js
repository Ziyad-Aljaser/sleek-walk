import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const useAuth = () => {
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return { signIn, signInWithGoogle, logout, error };
};
