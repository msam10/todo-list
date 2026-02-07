import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

export interface Itask {
  id: number;
  tx_name: string;
  st_status: boolean;
}
const API_URL = import.meta.env.VITE_TODO_LIST_API;
const GET_LIST_URL = `${API_URL}/getToDoList`;
const INSERT_LIST_URL = `${API_URL}/insertToDoList`;
const UPDATE_LIST_URL = `${API_URL}/updateToDoList`;

const TaskManager = () => {
  const [tasks, setTasks] = useState<Itask[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const res = await fetch(GET_LIST_URL);
      console.log("res", res);
      const data = await res.json();
      if (data.list) setTasks(data.list);
    } catch (e) {
      console.error("error fetching task", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTask();
  }, []);

  const addTask = async (title: string) => {
    try {
      await fetch(INSERT_LIST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tx_name: title, st_status: false }),
      });
      fetchTask();
    } catch (e) {
      console.error("Error adding task", e);
    }
    // const newTask = {
    //   id: tasks.length + 1,
    //   tx_name: title,
    //   st_status: false,
    // };
    // setTasks([...tasks, newTask]);
  };
  const toggleTaskCompletion = async (id: number) => {
    try {
      const task = tasks.find((task) => task.id === id);
      if (!task) return;
      await fetch(UPDATE_LIST_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          tx_name: task.tx_name,
          st_status: !task.st_status,
        }),
      });
      fetchTask();
    } catch (error) {
      console.error("Error actualizando", error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-y-6 p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg min-w-[40%]">
      <h1 className="text-3xl font-bold text-indigo-700">Gestor de Tareas</h1>
      <TaskInput addTask={addTask} />

      {loading ? (
        <>Esta cargando</>
      ) : (
        <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />
      )}
    </div>
  );
};

export default TaskManager;