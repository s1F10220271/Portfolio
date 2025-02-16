import React, { useState } from "react";

function TaskInput({ addTask, addGenre, genres }) {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [newGenre, setNewGenre] = useState(""); // 新しいジャンル追加

  const handleAddTask = () => {
    if (task) {
      addTask(task, deadline);
      setTask("");
      setDeadline("");
    }
  };

  const handleAddGenre = () => {
    if (newGenre) {
      addGenre(newGenre);
      setNewGenre("");
    }
  };

  return (
    <div className="task-input">
      {/* タスク入力 */}
      <input
        type="text"
        placeholder="新しいタスクを入力..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={handleAddTask}>追加</button>

      {/* 新しいジャンル追加 */}
      <div className="add-genre">
        <input
          type="text"
          placeholder="新しいジャンルを追加"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
        />
        <button onClick={handleAddGenre}>ジャンル追加</button>
      </div>
    </div>
  );
}

export default TaskInput;
