import React, { useState, useEffect } from "react";
import { addTask, getTasks, deleteTask, updateTask } from "../services/api";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [body, setBody] = useState("");
  const [recurrence, setRecurrence] = useState("none");
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token"); 
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token"); 
      if (!token) return;
  
      try {
        const res = await getTasks(token);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
  
    fetchTasks();
  }, []);
  

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newTask = await addTask({ title, dueDate, body, recurrence }, token);
      console.log(newTask.data)
      setTasks((prev) => [...prev, newTask.data]);
      setTitle("");
      setDueDate("");
      setBody("");
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };


  const handleComplete = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      console.log(task);
      const updated = await updateTask(id, { ...task, completed: !task.completed });
      console.log(updated);
      setTasks(tasks.map(t => t._id === id ? updated.data : t));
    } catch (err) {
      console.error("Mark complete failed:", err);
    }
  };
  

  const handleUpdate = async (id, currentTask) => {
    const updatedTitle = prompt("Update title", currentTask.title);
    const updatedBody = prompt("Update description", currentTask.body);
    const updatedDue = prompt("Update due date", currentTask.dueDate);
    const updatedrecurrence = prompt("Update recurrence", currentTask.recurrence);
    if (!updatedTitle && !updatedDue && !updatedBody) return;

    try {
      const res = await updateTask(id, {
        title: updatedTitle,
        body: updatedBody,
        dueDate: updatedDue,
        recurrence: updatedrecurrence
      });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="mt-20 pt-6 max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleAdd} className="space-y-4">
        <input
          type="text"
          placeholder="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
        value={recurrence}
        onChange={(e) => setRecurrence(e.target.value)}
        className="w-full p-2 border rounded"
        >
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        </select>
        <textarea
          placeholder="Task Description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Add Task
        </button>
      </form>
      <div className="mt-6 space-y-4">
      {tasks.length === 0 ? (
    <p className="text-center text-gray-500 italic">No tasks yet. Add one above!</p>
  ) : (
        tasks.map((t) => (
            <div
            key={t._id}
            className="bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full"
            >
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>
                <p className="text-sm text-gray-600">{t.body}</p>
                <p className="text-xs text-gray-500">Due: {t.dueDate?.split("T")[0]}</p>
            </div>
            <div className="flex flex-row gap-4 items-center mt-auto">
                <button
                onClick={() => handleUpdate(t._id, t)}
                className="*:text-blue-600 bg-blue-50 px-4 py-2 rounded-md hover:bg-blue-200 text-sm transition"
                >
                Update
                </button>
                <button
                onClick={() => handleComplete(t._id)}
                className={`text-green-600 bg-green-50 px-4 py-2 rounded-md hover:bg-green-200 text-sm transition ${t.completed ? 'line-through' : ''}`}
                >
                {t.completed ? 'Completed' : 'Completed task'}
                </button>

                <button
                onClick={() => handleDelete(t._id)}
                className="text-red-600 bg-red-50 px-4 py-2 rounded-md hover:bg-red-200 text-sm transition"
                >
                Delete
                </button>
            </div>
            <span className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mt-2">
                Repeats: {t.recurrence}
            </span>
            </div>
        )))}
        </div>
    </div>
  );
};

export default AddTask;
