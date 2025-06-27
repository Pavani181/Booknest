import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const user = res.data;

      // Store token and user info
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful! Welcome, " + user.name);

      // ✅ Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/books");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message);
      alert(
        "Login failed: " + (err.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
        <input
          className="border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
