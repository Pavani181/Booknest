import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const Layout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchWishlistCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistCount(res.data.length);
    } catch (err) {
      console.error("Failed to fetch wishlist count", err);
    }
  };

  useEffect(() => {
    fetchWishlistCount();

    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch user profile
    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIsAdmin(res.data.role === "admin");
      })
      .catch(() => {
        localStorage.removeItem("token");
      });

    // Listen for global wishlist update
    const updateWishlist = () => fetchWishlistCount();
    window.addEventListener("wishlistUpdated", updateWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlist);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-100">
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-purple-700 cursor-pointer"
        >
          📚 BookNest
        </h1>

        <div className="flex gap-6 items-center text-sm md:text-base">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>

          {isAdmin && (
            <>
              <Link to="/admin/users">Users</Link>
              <Link
                to="/books/add"
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                ➕ Add Book
              </Link>
              <Link to="/admin/orders">All Orders</Link>
            </>
          )}

          <Link to="/orders">My Orders</Link>

          <Link to="/cart" className="relative">
            🛒 Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="relative">
            💖 Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/dashboard">User</Link>
          <Link to="/admin/dashboard">Admin</Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-grow px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white text-center text-gray-500 py-3 border-t">
        &copy; {new Date().getFullYear()} BookNest. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
