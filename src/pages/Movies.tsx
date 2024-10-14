import React, { useCallback, useEffect, useState, useRef } from "react"
import { moviesApi } from "../app/services/moviesApi"
import { Button, CircularProgress, Input, Pagination } from "@nextui-org/react"
import Checkbox from "../components/Checkbox"
import MovieCard from "../components/MovieCard"
import { useNavigate, useParams } from "react-router-dom"
import { getYears } from "../features/getYears"
import { FiSearch } from "react-icons/fi"
import { MdClear } from "react-icons/md"

const Movies = () => {
  const { page = "1" } = useParams<{ page?: string }>()
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(page)
  const [search, setSearch] = useState<string>("")
  const [pageNumber, setPageNumber] = useState<number>()
  const [selectedFilters, setSelectedFilters] = useState({
    page: +page,
    movie: search,
    year: [] as number[],
    genres: [] as string[],
    countries: [] as string[],
  })

  const checkboxesRef = useRef<any>([]) // Для управления состоянием чекбоксов
  const { data: dataGenres } = moviesApi.useAllGenresQuery()
  const { data: dataTypes } = moviesApi.useAllTypesQuery()
  const { data: dataCountry } = moviesApi.useAllCountryQuery()
  const { data: dataFilter, status } =
    moviesApi.useFilterMoviesQuery(selectedFilters)

  const yearsArray = getYears()
  const movie = dataFilter?.docs || []


  const handlerSearch = () => {
    setCurrentPage(page)
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      page: +page,
      movie: search,
    }))
    setPageNumber(1)
  }

  const handlerSearchReset = async () => {
    try {
      setSearch("")
      navigate('/movies/1')
      setCurrentPage('1')
      setPageNumber(1)
      console.log(12)
      handlerSearch()
    } catch (e) {
      console.log(e)
    }
  }

  const pageHandler = (page: number) => {
    setCurrentPage(page.toString())
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      page: page,
      movie: search,
    }))
    window.scrollTo(0, 0)
  }

  const updateFilters = useCallback((newFilter: any) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      ...newFilter,
      page: 1,
    }))
    setCurrentPage("1")
    setPageNumber(1)
  }, [])

  const handlerFiltersReset = () => {
    setSelectedFilters({
      page: 1,
      movie: "",
      year: [] as number[],
      genres: [] as string[],
      countries: [] as string[],
    })
    checkboxesRef.current.forEach((resetFn: any) => resetFn())
  }

  useEffect(() => {
    setPageNumber(+page)
  }, [page])

  useEffect(() => {
    navigate(`/movies/${currentPage}`)
  }, [currentPage, navigate])

  const arrCheckbox = [
    {
      type: "genres",
      title: "Жанры",
      list: dataGenres,
    },
    {
      type: "countries",
      title: "Страны",
      list: dataCountry,
    },
    {
      type: "year",
      title: "Год",
      list: yearsArray,
    },
  ]

  if (!dataGenres || !dataTypes || !dataCountry) {
    return <CircularProgress size={"lg"} aria-label="Loading..." />
  }

  return (
    <div>
      <div className={"w-full flex gap-20 max-md:flex-col"}>
        <div className="w-1/4 max-md:w-full">
          <h1 className={"text-4xl mb-14"}>Фильтры</h1>
          <div className={"mb-10"}>
            <Input
              type="search"
              label="Поиск"
              value={search}
              onValueChange={setSearch}
              className={"mb-5"}
              isInvalid={
                selectedFilters.genres.length > 0 ||
                selectedFilters.year.length > 0 ||
                selectedFilters.countries.length > 0
              }
              errorMessage="Сбростье фильтры для поиска"
              disabled={
                selectedFilters.genres.length > 0 ||
                selectedFilters.year.length > 0 ||
                selectedFilters.countries.length > 0
              }
            />
            <div className={"flex justify-between items-center"}>
              <Button
                className={""}
                onClick={handlerSearch}
                isLoading={status !== "fulfilled"}
                endContent={<FiSearch />}
                size="lg"
                disabled={
                  selectedFilters.genres.length > 0 ||
                  selectedFilters.year.length > 0 ||
                  selectedFilters.countries.length > 0
                }
              >
                Поиск
              </Button>
              <Button
                className={""}
                onClick={handlerSearchReset}
                color={"danger"}
                isLoading={status !== "fulfilled"}
                endContent={<MdClear />}
                disabled={
                  selectedFilters.genres.length > 0 ||
                  selectedFilters.year.length > 0 ||
                  selectedFilters.countries.length > 0
                }
                size="lg"
              >
                Сбросить
              </Button>
            </div>
          </div>
          {dataGenres &&
            dataCountry &&
            yearsArray &&
            arrCheckbox.map((item, key) => (
              <Checkbox
                key={key}
                callbackValue={updateFilters}
                type={item.type}
                title={item.title}
                list={item.list}
                resetFilter={(resetFn: () => void) => {
                  checkboxesRef.current[key] = resetFn
                }}
              />
            ))}
          <Button
            className={""}
            onClick={handlerFiltersReset}
            color={"danger"}
            endContent={<MdClear />}
            size="lg"
          >
            Сбросить фильтры
          </Button>
        </div>
        <div className="w-3/4">
          {dataFilter && status === "fulfilled" ? (
            <>
              <h1 className={"text-4xl mb-14"}>Фильмы</h1>
              <div className={"flex flex-wrap gap-5"}>
                {movie && movie.length > 0 ? (
                  movie.map((movie, index) => (
                    <MovieCard
                      key={index}
                      title={movie.name}
                      image={movie.poster?.url}
                      id={movie.id}
                    />
                  ))
                ) : (
                  <h1>Нет доступных фильмов</h1>
                )}
              </div>
            </>
          ) : (
            <CircularProgress size={"lg"} aria-label="Loading..." />
          )}
        </div>
      </div>

      <div key={pageNumber} className="w-fit mx-auto mt-14 mb-14">
        {status === "fulfilled" && pageNumber && (
          <Pagination
            onChange={pageHandler}
            total={dataFilter?.pages || 0}
            initialPage={pageNumber !== +page ? 1 : pageNumber}
            size={"lg"}
          />
        )}
      </div>
    </div>
  )
}

export default Movies
