import React, { useState, useRef, useEffect, useContext } from 'react';
import { CategoryContext } from "../Context/CategoryContext";

// ✅ Display labels
const statuses = ['All', 'Active', 'Coming soon', 'Discontinued'];

// ✅ Map labels to actual API status values
const statusMap = {
  "Active": "publish",
  "Coming soon": "draft",
  "Discontinued": "trash"
};

const FilterDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('All');
  const dropdownRef = useRef(null);
  const { updateFilters } = useContext(CategoryContext);

  // ✅ Close dropdown on outside click
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ When user selects a filter option
  const handleSelect = (status) => {
    setSelected(status);
    const apiValue = status === "All" ? null : statusMap[status];
    updateFilters('status', apiValue); // null removes the filter
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className=" px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition "
      >
        {selected === "All" ? "Filter Status" : selected}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
          {statuses.map((status) => (
            <div
              key={status}
              onClick={() => handleSelect(status)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                selected === status ? 'bg-blue-50 font-semibold text-blue-600' : ''
              }`}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
