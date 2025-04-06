import React, { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext";

const Categories = ({ className }) => {
  const { categories, setSelectedCategoryId } = useContext(CategoryContext);
  const { updateFilters } = useContext(CategoryContext);

  return (
    <div className={className}>
    <div className="hidden lg:block w-full h-10 bg-slate-400 flex items-center">
      <h1 className=" font-semibold text-xl ml-9">Category</h1>
    </div>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => updateFilters('cats', cat.id)}
          className="block w-full text-left px-4 py-2 ml-5 hover:bg-gray-300"
        >
          {cat.name}
        </button>
      ))}

    </div>
  );
};

export default Categories;
