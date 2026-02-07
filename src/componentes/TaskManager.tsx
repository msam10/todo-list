import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import Sipiner from "./Sipiner";

export interface ITask {
id: number; 
tx_name: string;
st_status: boolean;
}

const API_URL = import.meta.env.VITE_TODO_LIST_API;
const GET_LIST_URL =`${API_URL}/getToDoList`;
const INSERT_LIST_URL = `${API_URL}/insertToDoList`;
const UPDATE_LIST_URL = `${API_URL}/updateToDoList`;



const TaskManager = () => {
const [tasks, setTasks] = useState<ITask []>([]);
const [loading,setLoading] = useState(false);


const fetchTasks = async () => {
  setLoading(true);
  try{
    const res = await fetch(GET_LIST_URL);
    console.log("res",res);
    const data = await res.json();

    if(data.list) setTasks(data.list);
  } catch (e) {
    console.error("Error fetching tasks",e);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTasks();
}, []);


const addTask = async (title: string) => {
try {
  await fetch (INSERT_LIST_URL, {
    method: "POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({ tx_name: title,st_status: false}),
  });
  fetchTasks();
} catch (e) {
  console.error("Error adding task", e);
  }
};

const toggleTaskCompletion = async (id:number) =>  {
  try{
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    await fetch(UPDATE_LIST_URL, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id,
        st_status:!task.st_status,
        tx_name : task.tx_name,
      }),
    });
    fetchTasks();
  } catch (e) {
    console.error("Error updating task",e);
  }
};

return (
<div className="flex flex-col items-center gap-y-6 p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg min-w-[40%]">
  <h1 className="text-3xl font-bold text-indigo-700">Gestor de tareas</h1>

  <TaskInput addTask={addTask} />

  {loading ? (
    <div className="flex items-center justify-center w-full pt-10">
    <Sipiner/>
    </div>
  ): (
    <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />

  )}
</div>

);
}
export default TaskManager;
