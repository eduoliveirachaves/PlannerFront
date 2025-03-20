import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createTask, getOneTimeTasks } from "@/api/TaskRequests.ts";
import { Loading } from "@/pages/Loading.tsx";
import { getProfile } from "@/api/UserRequests.ts";

interface Task {
  id: number;
  title: string;
  description: string;
  type: string;
  dueDate: string;
  status: string;
  schedule?: [];
}

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
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    document.title = "Dashboard";
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

    const fetchTasks = async () => {
      try {
        const data = await getOneTimeTasks();
        setTasks(data.data);
      } catch (e) {
        console.error("DASH BOARD CANNOT FETCH TASKS" + e);
      }
    };

    fetchTasks();
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
      await createTask(taskTitle, taskDescription, taskDeadline);

      const updatedTasks = await getOneTimeTasks();

      setTasks(updatedTasks.data);

      setTitle("");
      setDeadline("");
      setDescription("");

      setIsFormVisible(false);
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
        {/* se nao tiver nenhum item na lista retorna lista nao esta vazia */}
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 rounded-lg bg-gray-700 border border-gray-600"
              >
                <p className="text-lg font-medium text-white">{task.title}</p>
                <p className="text-sm text-gray-400">
                  Description: {task.description}
                </p>
                <p className="text-sm text-gray-400">
                  Deadline: {task.dueDate}
                </p>
                <p className="text-sm text-gray-400">Type: {task.type}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div>LISTA ESTA VAZIA</div>
        )}
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
