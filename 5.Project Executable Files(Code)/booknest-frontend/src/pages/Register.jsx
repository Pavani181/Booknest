import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      console.log(res.data); // 👈
      alert("Registration successful!"); // ✅ simple and clear
      // ✅ display message
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data?.message);
      alert(
        "Registration failed: " +
          (err.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-72">
        <input
          className="border p-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button className="bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
