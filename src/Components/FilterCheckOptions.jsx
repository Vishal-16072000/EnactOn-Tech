import React, { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext";

const FilterCheckOptions = () => {
  const { updateFilters } = useContext(CategoryContext);


  const handleCheckboxChange = (e, key) => {
    const isChecked = e.target.checked;
    updateFilters(key, isChecked ? 1 : null); // 1 for true, null to remove filter
  };

  return (
    <div className="flex gap-2">
      {/* Cashback Filter */}
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          onChange={(e) => handleCheckboxChange(e, "cashback_enabled")}
          className="m-1"
        />
        Cashback Enable
      </label>

      {/* Promoted Filter */}
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          onChange={(e) => handleCheckboxChange(e, "is_promoted")}
          className="m-1"
        />
        Promoted Stores
      </label>

      {/* Share & Earn Filter */}
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="m-1"
          onChange={(e) => handleCheckboxChange(e, "is_shareable")} // ✅ Must match API key
        />
        Share & Earn
      </label>
    </div>
  );
};

export default FilterCheckOptions;
