import React from "react";

function TaskItem({ task, toggleTaskCompletion, deleteTask }) {
  // 期限タグの表示
  const deadlineTag = task.deadline ? (
    <span className="task-tag">期限: {task.deadline}</span>
  ) : null;

  return (
    <li className="task-card">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />
      <span>
        {task.text} - ジャンル: {task.genre} {deadlineTag}
      </span>
      <button onClick={() => deleteTask(task.id)}>🗑️</button>
    </li>
  );
}

export default TaskItem;
