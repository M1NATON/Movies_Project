import { useState, useEffect, useCallback, useRef } from "react"
import { FiltersType } from "../type/filtersType"

export const useMovieFilters = (initialFilters: FiltersType) => {
  const [filters, setFilters] = useState(initialFilters);
  const checkboxesRef = useRef<any>([])
  const updateFilters = useCallback((newFilter: Partial<FiltersType>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilter }));
  }, []);

  const resetFilters = () => {

    setFilters(initialFilters)
    checkboxesRef.current.forEach((resetFn: any) => resetFn())
  }

  return { filters, setFilters, updateFilters,checkboxesRef, resetFilters };
};
