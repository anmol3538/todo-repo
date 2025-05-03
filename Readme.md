#  ToDo Task Manager

A simple task management web application built with the MERN stack that allows users to add, update, complete, and delete tasks. Tasks can have due dates and recurrence types (daily, weekly, monthly).

## Features

- Add, edit, delete tasks
- Mark tasks as complete
- Set due dates
- Set recurrence (daily, weekly, monthly)
- Token-based authentication (assumes JWT)
- Responsive UI with Tailwind CSS

##  Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: useState, useEffect

## 📦 Installation

1. **Clone the repo**

```bash
git clone https://github.com/anmol3538/todo-repo.git
cd todo-repo


### 🔒 Backend (`/server/.env`)

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key

# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install


# Backend (in /backend)
nodemon server.js

# Frontend (in /frontend)
npm run dev
