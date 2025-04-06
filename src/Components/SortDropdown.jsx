// components/SortDropdown.jsx
import React from "react";

const SortDropdown = ({ onChange }) => {
  return (
    <div>
      <select
        onChange={(e) => onChange(e.target.value)}
        className="outline-none px-2 py-2 border rounded shadow"
      >
        <option value="">Sort by</option>
        <option value="name">Name (A-Z)</option>
        <option value="featured_desc">Featured</option>
        <option value="popularity">Popularity</option>
        <option value="cashback">Cashback</option>
      </select>
    </div>
  );
};

export default SortDropdown;
