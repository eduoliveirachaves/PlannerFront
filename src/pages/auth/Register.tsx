import * as React from "react";
import { useContext, useEffect } from "react";
import { registerUser } from "@/api/AuthService.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext.tsx";

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { login } = auth;

  useEffect(() => {
    document.title = "Sign Up"
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted");
    try {
      await registerUser(name, email, password);
      await login(email, password);

      navigate("/");
    } catch (error) {
      console.error("NAO FOI POSSIVEL CRIAR : " + error);
    }
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <Card className="w-full max-w-md p-6 rounded-xl shadow-lg bg-gray-900 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              {" "}
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
