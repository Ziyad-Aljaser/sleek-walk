import React from "react";

import Layout from "../components/Layout";

import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();

  return (
    <Layout>
        <div>
            <h1>Profile</h1>
            <p><strong>Full Name:</strong> {currentUser.displayName}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
        </div>
    </Layout>
  );
}
