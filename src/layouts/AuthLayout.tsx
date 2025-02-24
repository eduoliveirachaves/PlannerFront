import { Outlet } from "react-router-dom";
import "./../styles/authStyle.css";

export default function AuthLayout() {
  return (
    <div className={"auth-layout"}>
      <h2>Auth test</h2>
      <Outlet />
    </div>
  );
}
