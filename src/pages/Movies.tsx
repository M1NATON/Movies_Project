import React, { useCallback, useEffect, useState, useRef, useMemo } from "react"
import { moviesApi } from "../app/services/moviesApi"
import {
  CircularProgress
} from "@nextui-org/react"
import { useNavigate, useParams } from "react-router-dom"
import { getYears } from "../features/getYears"
import MovieList from "../components/movies/MovieList"
import MoviesPagination from "../components/movies/MoviesPagination"
import MovieFilters from "../components/movies/MovieFilters"
import MovieFiltersMobail from "../components/movies/MovieFiltersMobail"
import { movieStatusApi } from "../app/services/movieStatusApi"
import { logout } from "../app/slices/UserSlice"

const Movies = () => {
  const { page = "1" } = useParams<{ page?: string }>()
  const navigate = useNavigate()
  const yearsArray = getYears()

  const [filters, setFilters] = useState<{
    page: number;
    movie: string;
    year: string[];
    genres: string[];
    countries: string[];
    type: string[];
  }>({
    page: +page,
    movie: "",
    year: [],
    genres: [],
    countries: [],
    type: []
  })

  const [searchQuery, setSearchQuery] = useState("")

  const checkboxesRef = useRef<any>([])

  const { data: dataGenres } = moviesApi.useAllGenresQuery()
  const { data: dataTypes } = moviesApi.useAllTypesQuery()
  const { data: dataCountry } = moviesApi.useAllCountryQuery()
  const {
    data: dataFilter,
    status,
    refetch
  } = moviesApi.useFilterMoviesQuery({
    page: filters.page,
    movie: filters.movie,
    year: filters.year.map(Number),
    genres: filters.genres,
    countries: filters.countries,
    type: filters.type,
  })

  const movies = dataFilter?.docs || []

  const handleSearch = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: 1,
      movie: searchQuery
    }))
    navigate("/movies/1")
  }
  const handleSearchReset = () => {
    setSearchQuery("")
    setFilters({
      page: 1,
      movie: "",
      year: [],
      genres: [],
      countries: [],
      type: []
    })
    navigate("/movies/1")
    refetch()
  }

  const handlePageChange = (page: number) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page
    }))
    navigate(`/movies/${page}`)
    window.scrollTo(0, 0)
  }

  const updateFilters = useCallback((newFilter: Partial<typeof filters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilter
    }))
  }, [])

  const handleFiltersReset = () => {
    setFilters({
      page: 1,
      movie: "",
      year: [],
      genres: [],
      countries: [],
      type: []
    })
    checkboxesRef.current.forEach((resetFn: any) => resetFn())
  }

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: +page
    }))
  }, [page])

  const arrCheckbox = useMemo(
    () => [
      { type: "genres", title: "Жанры", list: dataGenres },
      { type: "countries", title: "Страны", list: dataCountry },
      { type: "year", title: "Год", list: yearsArray },
      { type: "type", title: "Тип", list: dataTypes }
    ],
    [dataGenres, dataCountry, yearsArray, dataTypes]
  )

  if (!dataGenres || !dataTypes || !dataCountry) {
    return (
      <div className={"w-fit mx-auto flex justify-center items-center"}>
        <CircularProgress size={"lg"} aria-label="Loading..." />
      </div>
    )
  }

  return (
    <div>
      <div className={"w-full xl:flex-row flex flex-col p-2"}>
        {window.innerWidth <= 1024 ? (
          <MovieFiltersMobail
            filters={filters}
            setFilters={setFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleSearchReset={handleSearchReset}
            updateFilters={updateFilters}
            handleFiltersReset={handleFiltersReset}
            arrCheckbox={arrCheckbox}
            checkboxesRef={checkboxesRef}
          />
        ) : (
          <MovieFilters
            filters={filters}
            setFilters={setFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleSearchReset={handleSearchReset}
            updateFilters={updateFilters}
            handleFiltersReset={handleFiltersReset}
            arrCheckbox={arrCheckbox}
            checkboxesRef={checkboxesRef}
          />
        )}

        <MovieList movies={movies} status={status} />
      </div>

      <MoviesPagination
        status={status}
        handlePageChange={handlePageChange}
        dataFilter={dataFilter!}
        filters={filters}
      />
    </div>
  )
}

export default Movies
