import { AuthContext } from "../../context/AuthContext";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const { login /*, isAuthenticated  */ } = authContext;

  /*useEffect(() => {
    const autoRedirect = () => {
      if (isAuthenticated) {
        console.log("ALREADY AUTHENTICATED");
        navigate("/");
      }
    };
    autoRedirect();
  }, []); */

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    console.log("Form submitted");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-400">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md"
          >
            Sign In
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
