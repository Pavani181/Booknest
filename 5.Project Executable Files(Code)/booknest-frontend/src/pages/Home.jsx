// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
      <div className="text-center px-4">
        <img
          src="/reading-book.svg"
          alt="Reading Book"
          className="w-72 mx-auto mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
          Welcome to BookNest
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-6">
          Discover, collect, and manage your favorite books with ease. <br />
          BookNest is your personal digital bookstore. <br />
          Register to explore a growing collection!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
