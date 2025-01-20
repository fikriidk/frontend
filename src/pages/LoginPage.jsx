import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Perform any client-side validation if needed

      // Perform the login API request
      const response = await fetch("https://backend.ptwpi.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data.token;

      // Use the login function from the useAuth hook to set the token
      auth.login(token);

      // Use the fetchUser function from the useAuth hook
      await auth.fetchUser();

      // Redirect to another page upon successful login
      if (token) {
        navigate("/dashboard");
      } else {
        // Handle a case where the token is not received
        console.error("Token not received");
        toast.error("Login failed. Please check your credentials.");
      }

    } catch (error) {
      // Handle login failure
      console.error("Login failed", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-wpigreen-50 to-wpiblue-50">
      <div className="flex items-center justify-center h-screen">
        <Card color="white" shadow={false} className="bg-white shadow-lg p-8">
          <Typography id="Typography" variant="h4" color="blue-gray" className="text-center">
            Selamat Datang di <br />
            Warung Pangan Indonesia
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                id="email"
                size="lg"
                placeholder="Input your email"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                id="password"
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              id="login-button"
              className="mt-6 bg-wpigreen-50"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography
              color="gray"
              className="mt-4 text-center font-normal"
            >
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-gray-900 hover:text-blue-600"
              >
                Register here
              </a>
            </Typography>
          </form>
        </Card>
      </div>
      {/* Add the ToastContainer to your component */}
      <ToastContainer />
    </div>
  );
}
