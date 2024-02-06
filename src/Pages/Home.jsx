// ParentComponent.js

import React, { useState } from 'react';
import TaskForm from '../Components/TaskForm';
import TasksPage from '../Components/TasksPage';
import Navbar from '../Components/Navbar'
const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = newTask => {
    // Add newTask to the tasks state
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <Navbar/>
      <TaskForm addTask={addTask} />
   
     
    </div>
  );
};

export default Tasks;
