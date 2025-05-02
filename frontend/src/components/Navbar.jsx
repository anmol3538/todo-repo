import React from "react";
import { Link } from "react-router-dom";
import '../pages/Signup'
import Signup from "../pages/Signup";
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Todo App
      </Link>
      <div className="space-x-4">
        <Link to="/add-task" className="text-sm font-medium text-gray-700 hover:text-blue-500">
          Add Task
        </Link>
        <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-500">
          Login
        </Link>
        <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-blue-500">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
