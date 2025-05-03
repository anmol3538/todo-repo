import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">📝 ToDo Task Manager</h1>
        <p className="text-gray-600 mb-6">
          Organize your day efficiently! Manage daily, weekly, or monthly tasks with due dates and recurring reminders.
        </p>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => navigate("/add-task")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Tasks
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition"
          >
            Login
          </button>
        </div>

        <div className="text-left mt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">✨ Features:</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Add and track tasks</li>
            <li>Set due dates and recurring schedules</li>
            <li>Mark tasks as complete</li>
            <li>Fully responsive and modern design</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
