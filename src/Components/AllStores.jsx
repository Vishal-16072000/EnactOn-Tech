import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../Context/CategoryContext"; // correct import
import StatusFilter from "./StatusFilter";
import { CiSearch } from "react-icons/ci";
import AlphabetFilter from "./AlphabetFilter";
import FilterCheckOptions from "./FilterCheckOptions";
import ProductShow from "./ProductShow";
import SortDropdown from "./SortDropdown";
import Categories from "./Categories";

const AllStores = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const { setSort, updateFilters, filters, goToNextPage } =
    useContext(CategoryContext); // get it from context

  const handleFilterChange = (status) => {
    console.log(`Filter applied: ${status}`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateFilters("name_like", value);
  };

  const handleAlphabetSelect = (letter) => {
    console.log("Filter by letter:", letter);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        // Load next page
        goToNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`mt-1 ml-2 ${className} h-[100vh]`}>
      <div className="flex flex-row-reverse lg:flex lg:flex-row justify-around items-center">
        <div className="hidden lg:block">
          <StatusFilter onFilterChange={handleFilterChange} />
        </div>
        <div className=" bg-slate-100 w-[70%] ml-5 lg:ml-0 lg:w-[60%] h-12 flex items-center shadow-lg rounded-3xl">
          <CiSearch className="text-2xl w-10" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-[80%] lg:ml-0 bg-slate-100 p-2 border-none outline-none"
          />
        </div>
        <div>
          <SortDropdown
            onChange={(sortOption) => {
              console.log("Selected sort option:", sortOption);
              setSort(sortOption); // context method
            }}
          />
        </div>
      </div>

      <div className="flex justify-between mt-2 gap-3">
        <div className="block lg:hidden">
          <StatusFilter onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:hidden flex-1 mr-1">
          <button
            className="w-full bg-lime-300 text-black font-semibold py-2 rounded-md shadow"
            onClick={() => setShowCategories((prev) => !prev)}
          >
            {showCategories ? "Hide Categories" : "Show Categories"}
          </button>

          {showCategories && (
            <div className="mt-2 bg-slate-100 rounded-md shadow">
              <Categories />
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:block px-4">
        <AlphabetFilter onSelect={handleAlphabetSelect} />
      </div>
      <div className=" text-[12px] lg:text-base lg:px-6 pb-6 mt-2 lg:mt-0">
        <FilterCheckOptions onChange={handleFilterChange} />
      </div>

      <ProductShow />
    </div>
  );
};

export default AllStores;
