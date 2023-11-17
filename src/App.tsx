import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Task from "./Task";
import "./App.css";
import { FaWindowClose } from "react-icons/fa";
import { PiSunLight } from "react-icons/pi";
import { FaMoon } from "react-icons/fa";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<
    { task: string; category: string; completed: boolean }[]
  >([]);
  const [newTask, setNewTask] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. - Steve Jobs",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston S. Churchill",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  ];

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTask.trim() !== "" && selectedCategory.trim() !== "") {
      const updatedTasks = [
        ...tasks,
        { task: newTask, category: selectedCategory, completed: false },
      ];
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setNewTask("");
      setShowForm(false);
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleToggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  const saveTasksToLocalStorage = (
    tasks: { task: string; category: string; completed: boolean }[]
  ) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const getTasksFromLocalStorage = (): {
    task: string;
    category: string;
    completed: boolean;
  }[] => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const shuffledQuotes = shuffleArray(quotes);
  useEffect(() => {
    // Shuffle quotes when the component mounts or when currentQuoteIndex reaches the end
    setCurrentQuoteIndex(0);
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex(
        (prevIndex) => (prevIndex + 1) % shuffledQuotes.length
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [quotes]);

  const currentQuote = shuffledQuotes[currentQuoteIndex];

  const handleClearAllTasks = () => {
    setTasks([]);
    saveTasksToLocalStorage([]);
  };

  return (
    <div className="flex max-w-screen h-screen">
      <div className="hidden lg:block background-quote w-[45%]  pt-36 text-5xl self-center border-r px-8 text-center fixed h-full">
        {currentQuote}
      </div>
      <div className=" task w-screen mx-auto md:mx-[10%] lg:w-2/5 lg:ml-[50%] px-6 h-full">
        <div className=" flex justify-between mb-12 mt-24 pb-6 border-b-4 border-sky-500">
          <h1 className="text-3xl font-bold mb-4">To-Do</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="ml-2 p-2 0 "
          >
            {isDarkMode ? (
              <PiSunLight size={25} />
            ) : (
              <FaMoon className="" size={25} />
            )}
          </button>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="mb-4 p-2 new bg-black text-white font-semibold rounded"
        >
          New Task
        </button>
        {showForm ? (
          <form
            onSubmit={handleAddTask}
            className="mb-4 border p-2 flex flex-col rounded-md"
          >
            <button
              onClick={() => setShowForm(false)}
              className="self-end mx-4"
            >
              <FaWindowClose />
            </button>
            <label htmlFor="task name" className="ml-4 mt-4">
              Task Name:
              <input
                type="text"
                value={newTask}
                onChange={handleTaskChange}
                placeholder="Add a new task"
                className="p-2 border mb-2 w-1/2 ml-4"
              />
            </label>
            <label htmlFor="category" className="ml-4">
              Category:
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="ml-7 mb-4 p-2 border text-black"
              >
                <option value="" className="text-black">
                  Select Category
                </option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Important">Important</option>
              </select>
            </label>
            <button
              type="submit"
              className="ml-2 p-2 bg-blue-500 text-white self-center w-1/4 rounded"
            >
              Add Task
            </button>
          </form>
        ) : (
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="ml-2 p-2 border rounded"
          >
            <option value="">All Tasks</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Important">Important</option>
          </select>
        )}

        <ul>
          {filteredTasks.map((task, index) => (
            <Task
              key={index}
              task={task.task}
              category={task.category}
              completed={task.completed}
              onDelete={() => handleDeleteTask(index)}
              onToggleComplete={() => handleToggleComplete(index)}
            />
          ))}
        </ul>

       {tasks.length > 0 && <button onClick={handleClearAllTasks} className="rounded mt-10 ml-2 p-2 bg-red-500 text-white ">
        Clear All Tasks
      </button>}
      </div>
    </div>
  );
};

export default App;
