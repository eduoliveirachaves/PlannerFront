import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext.tsx";
import { useContext } from "react";
import { Loading } from "@/pages/Loading.tsx";

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

export default function Home() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  if (!user) {
    return <Loading />;
  }

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
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-6 rounded-lg shadow-md">
          + Add New Task
        </Button>
      </div>
    </div>
  );
}
