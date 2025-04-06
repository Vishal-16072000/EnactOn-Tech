import React, { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [store, setStore] = useState([]);

  // 🔥 Centralized filters state
  const [filters, setFilters] = useState({
    cats: null,
    status: null,
    cashback_enabled: null,
    is_promoted: null,
    is_shareable: null,
    name_like: null,
    page: 1,
    limit: 20,
    sort: null,
    order: null,
  });

  const goToNextPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const goToPreviousPage = () => {
    setFilters((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));
  };

  const setPage = (pageNumber) => {
    setFilters((prev) => ({ ...prev, page: pageNumber }));
  };

  const setSort = (sortOption) => {
    switch (sortOption) {
      case "name":
        setFilters((prev) => ({
          ...prev,
          sort: "name",
          order: "asc",
          page: 1,
        }));
        break;
      case "featured_desc":
        setFilters((prev) => ({
          ...prev,
          sort: "featured",
          order: "desc",
          page: 1,
        }));
        break;
      case "popularity":
        setFilters((prev) => ({
          ...prev,
          sort: "clicks",
          order: "desc",
          page: 1,
        }));
        break;
      case "cashback":
        setFilters((prev) => ({
          ...prev,
          sort: "amount_type,cashback_amount",
          order: "asc,desc",
          page: 1,
        }));
        break;
      default:
        setFilters((prev) => ({
          ...prev,
          sort: null,
          order: null,
          page: 1,
        }));
    }
  };

  // ✅ Update any filter
  const updateFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // reset to page 1 when new filter is applied
    }));
  };

  // 🎯 Get all categories initially
  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // 🔄 Fetch stores based on filters
  useEffect(() => {
    let url = "http://localhost:3001/stores?";
    const params = [];
  
    if (filters.cats !== null) params.push(`cats=${filters.cats}`);
    if (filters.status !== null) params.push(`status=${filters.status}`);
    if (filters.cashback_enabled !== null) params.push(`cashback_enabled=${filters.cashback_enabled}`);
    if (filters.is_promoted !== null) params.push(`is_promoted=${filters.is_promoted}`);
    if (filters.is_shareable !== null) params.push(`is_shareable=${filters.is_shareable}`);
    if (filters.name_like) params.push(`name_like=${filters.name_like}`);
    if (filters.page) params.push(`_page=${filters.page}`);
    if (filters.limit) params.push(`_limit=${filters.limit}`);
    if (filters.sort) params.push(`_sort=${filters.sort}`);
    if (filters.order) params.push(`_order=${filters.order}`);
  
    url += params.join("&");
    console.log("Final store fetch URL:", url);
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setStore((prev) => {
          // ✅ Append if page > 1, else replace
          return filters.page > 1 ? [...prev, ...data] : data;
        });
      });
  }, [filters]);
  

  return (
    <CategoryContext.Provider
      value={{
        categories,
        store,
        updateFilters,
        goToNextPage,
        goToPreviousPage,
        setPage,
        filters,
        setSort,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
