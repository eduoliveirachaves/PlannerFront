import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createTask } from "@/api/TaskRequests.ts";
import { Loading } from "@/pages/Loading.tsx";
import { getProfile } from "@/api/UserRequests.ts";

interface Task {
  id: number;
  title: string;
  category: string;
  deadline: string;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Finish React project",
    category: "Work",
    deadline: "2025-03-10",
  },
  {
    id: 2,
    title: "Buy groceries",
    category: "Personal",
    deadline: "2025-03-05",
  },
  { id: 3, title: "Workout", category: "Health", deadline: "2025-03-07" },
];

interface User {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [taskTitle, setTitle] = useState("");
  const [taskDescription, setDescription] = useState("");
  const [taskDeadline, setDeadline] = useState("");

  useEffect(() => {
    const profile = async () => {
      try {
        const req = await getProfile();

        if (req) {
          setUser(req);
        }
      } catch (err) {
        console.error(err);
      }
    };
    profile();
  }, []);

  if (!user) {
    return <Loading />;
  }

  const handleCreateTask = () => {
    setIsFormVisible(true);
  };

  const handleCloseCreateTask = () => {
    setIsFormVisible(false);
  };

  const handleSubmitTask = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log("HANDLE SUBMIT TASK");
      const res = await createTask(taskTitle, taskDescription, taskDeadline);
      console.log(" RESPONSE FORM HANDLE SUBMIT TASK " + res);
    } catch (err) {
      console.error("DASHBOARD : ERROR SENDING CREATE TASK " + err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">
        Welcome, {user.name}!
      </h1>
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          Your Tasks
        </h2>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 rounded-lg bg-gray-700 border border-gray-600"
            >
              <p className="text-lg font-medium text-white">{task.title}</p>
              <p className="text-sm text-gray-400">Category: {task.category}</p>
              <p className="text-sm text-gray-400">Deadline: {task.deadline}</p>
            </li>
          ))}
        </ul>
        <Button
          onClick={handleCreateTask}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-6 rounded-lg shadow-md"
        >
          + Add New Task
        </Button>
      </div>

      {/* task create "pop up" */}
      {isFormVisible && (
        <div className="form-modal bg-gray-800 p-6 rounded-lg shadow-xl mt-6 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Create Task
          </h2>
          <form onSubmit={handleSubmitTask} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                required
              />
            </div>
            <div>
              <input
                type="date"
                value={taskDeadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={handleCloseCreateTask}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
