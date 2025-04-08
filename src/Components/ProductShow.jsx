import React, { useContext, useState } from "react";
import { CategoryContext } from "../Context/CategoryContext";
import { FaHeart } from "react-icons/fa";

const ProductShow = () => {
  const {
    store,
    filters,
    goToNextPage,
    goToPreviousPage,
    setPage
  } = useContext(CategoryContext);

  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {store.length === 0 ? (
          <p>No stores found 😔</p>
        ) : (
          store.map((item) => (
            <a
              key={item.id}
              href={item.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="border p-4 shadow rounded relative block hover:shadow-lg transition"
            >
              {/* Heart Icon */}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavourite(item.id);
                }}
                className="absolute top-2 right-2 cursor-pointer z-10"
                title={
                  favourites.includes(item.id)
                    ? "Remove from favourites"
                    : "Add to favourites"
                }
              >
                {favourites.includes(item.id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaHeart className="text-gray-400" />
                )}
              </div>

              <img src={item.logo} alt={item.name} className="h-24 mx-auto" />
              <h2 className="text-lg font-semibold text-center">{item.name}</h2>
              <p className="text-center text-green-600">
                {item.cashback_enabled === 1
                  ? `${item.rate_type === "upto" ? "Upto" : "Flat"} ${
                      item.amount_type === "fixed"
                        ? `₹${item.cashback_amount.toFixed(2)}`
                        : `${item.cashback_amount.toFixed(2)}%`
                    } cashback`
                  : "No cashback available"}
              </p>
            </a>
          ))
        )}
      </div>

      {/* Pagination Buttons */}
      {/* <div className="mt-6 flex justify-center items-center gap-2">
        <button
          onClick={goToPreviousPage}
          disabled={filters.page === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-medium">Page {filters.page}</span>
        <button
          onClick={goToNextPage}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div> */}
    </>
  );
};

export default ProductShow;
