import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("test");
    logout();
    navigate("/login");
  };

  const handleProfileNavigation = () => {
    navigate("/user/profile");
  };

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>Protected Route</p>
      <button onClick={handleLogout}>LOGOUT</button>
      <button onClick={handleProfileNavigation}>Go to Profile</button>
    </div>
  );
}
