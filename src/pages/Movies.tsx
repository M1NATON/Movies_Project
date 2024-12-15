import React, { useCallback, useEffect, useState} from "react"
import { CircularProgress } from "@nextui-org/react"
import { useNavigate, useParams } from "react-router-dom"
import MovieList from "../components/movies/MovieList"
import MoviesPagination from "../components/movies/MoviesPagination"
import MovieFilters from "../components/movies/MovieFilters"
import MovieFiltersMobail from "../components/movies/MovieFiltersMobail"
import { useMovieFilters } from "../hooks/useMovieFilters"
import { useMovieData } from "../hooks/useMovieData"
import { emptyFilter } from "../features/emptyFilter"


const Movies = () => {
  const { page = "1" } = useParams<{ page?: string }>()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const { filters,setFilters, updateFilters, resetFilters, checkboxesRef } = useMovieFilters(emptyFilter);
  const {dataGenres, dataCountry, dataTypes, dataFilter, status, refetchFilter} = useMovieData({
    page: filters.page,
    movie: filters.movie,
    year: filters?.year?.map(Number),
    genres: filters.genres,
    countries: filters.countries,
    type: filters.type,
    lists: "",
  })



  const movies = dataFilter?.docs || []

  const handleSearch = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: 1,
      movie: searchQuery,
    }))
    navigate("/movies/1")
  }
  const handleSearchReset = () => {
    setSearchQuery("")
    setFilters(emptyFilter)
    navigate("/movies/1")
    refetchFilter()
  }


  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: +page,
    }))
  }, [page])


  if (!dataGenres || !dataTypes || !dataCountry) {
    return (
      <div className={"w-fit mx-auto flex justify-center items-center"}>
        <CircularProgress size={"lg"} aria-label="Loading..." />
      </div>
    )
  }

  return (
    <div>
      <div className={"w-full xl:flex-row flex items-start flex-col p-2"}>
        {window.innerWidth <= 1024 ? (
          <MovieFiltersMobail
            filters={filters}
            setFilters={setFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleSearchReset={handleSearchReset}
            updateFilters={updateFilters}
            handleFiltersReset={resetFilters}
            checkboxesRef={checkboxesRef}
          />
        ) : (
          <MovieFilters
            setFilters={setFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleSearchReset={handleSearchReset}
            updateFilters={updateFilters}
            handleFiltersReset={resetFilters}
            checkboxesRef={checkboxesRef}
          />
        )}

        <MovieList movies={movies} status={status} />
      </div>

      <MoviesPagination
        status={status}
        type={'/movies'}
        pageTwo={dataFilter?.page || 1}
        setFilters={setFilters}
        dataFilter={dataFilter!}
        size={"lg"}
      />
    </div>
  )
}

export default Movies
