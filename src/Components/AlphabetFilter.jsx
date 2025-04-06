import React, { useState, useContext } from 'react';
import { CategoryContext } from '../Context/CategoryContext';

const alphabets = ['All', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

const AlphabetFilter = () => {
  const [activeLetter, setActiveLetter] = useState('All');
  const { updateFilters } = useContext(CategoryContext);

  const handleClick = (letter) => {
    setActiveLetter(letter);
    if (letter === 'All') {
      updateFilters('name_like', null); // 🔄 clear filter
    } else {
      updateFilters('name_like', `^${letter}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {alphabets.map((letter) => (
        <button
          key={letter}
          onClick={() => handleClick(letter)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            activeLetter === letter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetFilter;
