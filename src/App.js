import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Tabs from "./components/Tabs";
import { categorizeTask } from "./utils/genreCategorizer";
import Calendar from "react-calendar";
import "./App.css";
import "react-calendar/dist/Calendar.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [genres, setGenres] = useState(["課題", "勉強", "バイト", "就活"]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  // 新しいジャンルを追加
  const addGenre = (newGenre) => {
    if (!genres.includes(newGenre)) {
      setGenres([...genres, newGenre]);
    }
  };

  // 新しいタスクを追加
  const addTask = async (taskText, deadline) => {
    const dynamicGenres = genres.join("、");
    const genre = await categorizeTask(taskText, dynamicGenres);

    if (!genres.includes(genre)) {
      setGenres([...genres, genre]);
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      genre: genre || "その他",
      deadline,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // タスクの完了・未完了を切り替える
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // タスクを削除
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // テーマの切り替え
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? "light-mode" : "dark-mode";
  };

  // タスクのフィルタリング
  const filteredTasks = tasks.filter((task) => {
    if (selectedDate) {
      const formattedSelectedDate = new Date(selectedDate)
        .toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })
        .replace(/\//g, "-");
      return task.deadline === formattedSelectedDate;
    }
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    if (selectedGenre !== "all") return task.genre === selectedGenre;
    return true;
  });

  // 「すべて」タブでカレンダー選択を解除
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === "all") {
      setSelectedDate(null);
    }
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="calendar-container">
      <Calendar
  onChange={(date) => setSelectedDate(date)}
  value={selectedDate}
  tileContent={({ date }) => {
    const formattedDate = new Date(date)
      .toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })
      .replace(/\//g, "-");
    const hasTask = tasks.some((task) => task.deadline === formattedDate);
    return hasTask ? <div className="calendar-dot"></div> : null;
  }}
/>
      </div>

      <div className="app-container">
        <div className="header">
          <h1>CampusPlanner</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <TaskInput addTask={addTask} addGenre={addGenre} genres={genres} />
        <Tabs
          setFilter={handleFilterChange}
          setSelectedGenre={setSelectedGenre}
          genres={genres}
        />
        <h2>
          {selectedDate
            ? `${new Date(selectedDate).toLocaleDateString("ja-JP")} のタスク`
            : "全てのタスク"}
        </h2>
        <TaskList
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
