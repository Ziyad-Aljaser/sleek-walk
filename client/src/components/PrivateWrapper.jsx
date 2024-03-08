import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUserRole } from "../utils/FirestoreUtils";
import { db } from "../config/firebase";

// Used to protect the path from users that are not logged in. It redirect the user to the login page
export const PrivateUserWrapper = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" replace />;
};

// Used to protect the path from users that are not logged in as admin. It redirect the user to the home page
export const PrivateAdminWrapper = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await getUserRole(userId, db);
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [userId]); // adding userId to dependency array to re-run effect when it changes

  // Check if the user is an admin
  const isAdmin = userRole === "Admin";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? children : <Navigate to="/" replace />;
};
