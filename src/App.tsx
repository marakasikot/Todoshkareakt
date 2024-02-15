import React, { useState, useEffect } from 'react';

interface Task {
  text: string;
  date: string;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>('');
  const [newTaskDate, setNewTaskDate] = useState<string>('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      const sortedTasks = parsedTasks.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setTasks(sortedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addTask = () => {
    if (newTask.trim() !== '' && newTaskDate.trim() !== '') {
      const newTaskObject: Task = {
        text: newTask,
        date: newTaskDate,
      };
      // Sort tasks by date before updating state
      const updatedTasks = [...tasks, newTaskObject].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setTasks(updatedTasks);
      setNewTask('');
      setNewTaskDate('');
      closeModal();
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>My To-Do List</h1>
      <button onClick={openModal}>Add Task</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <input
              type="text"
              placeholder="Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <input
              type="date"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>
      )}

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.text} - {task.date}
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
};

export default App;
