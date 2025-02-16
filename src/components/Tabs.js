import React from "react";

function Tabs({ setFilter, setSelectedGenre, genres }) {
  return (
    <div className="tabs">
      <button onClick={() => setFilter("all")}>すべて</button>
      <button onClick={() => setFilter("incomplete")}>未完了</button>
      <button onClick={() => setFilter("completed")}>完了済み</button>
      <button onClick={() => setFilter("deadline")}>期限が近い順</button>

      {/* ジャンルごとの絞り込み */}
      <select onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="all">すべてのジャンル</option>
        {genres.map((g, index) => (
          <option key={index} value={g}>{g}</option>
        ))}
      </select>
    </div>
  );
}

export default Tabs;
