import { useEffect, useState } from "react";
import { getProfile } from "../api/UserRequests.ts";
import { Loading } from "./Loading.tsx";

interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="page">
      <div className="container">
        <img
          src="../assets/react.svg"
          alt="User profile picture"
          className="picture"
        ></img>
        <div className="info-container">
          <div className="user-info">Name: {user.name}</div>
          <div className="user-info">Email: {user.email}</div>
          <div className="user-info">age</div>
          <div className="user-info">idk</div>
          <div className="bg-red-500">idk</div>
        </div>
      </div>
    </div>
  );
}
