import { useState } from "react";
export interface ITask {
id: number; 
tx_name: string;
st_status: boolean;
}

const TaskManager = () => {
const [tasks, setTasks] = useState<ITask []>([]);

const addTask = (title: string) => {
const newTask = {
id: tasks.length + 1, 
tx_name: title, 
st_status:false,
};
setTasks([...tasks,newTask]);
};

const toggleTaskCompletion = (id:number) =>  {
setTasks(
   tasks.map((task) =>
    task.id === id ? {...task,st_status: !task.st_status} : task
  )
 );
};

return (
<div className="flex flex-col items-center gap-y-6 p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg min-w-[40%]">
<h1 className="text-3xl font-bold text-indigo-700">Gestor de tareas</h1>
</div>

);
};

export default TaskManager;