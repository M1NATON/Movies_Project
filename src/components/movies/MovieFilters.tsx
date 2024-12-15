import MovieSearch from "./MovieSearch"
import Checkbox from "../Checkbox"
import { Button } from "@nextui-org/react"
import { FiltersType } from "../../type/filtersType"
import { useMemo } from "react"
import { useMovieData } from "../../hooks/useMovieData"
import { getYears } from "../../features/getYears"
import { useMovieFilters } from "../../hooks/useMovieFilters"
import { emptyFilter } from "../../features/emptyFilter"


type Props = {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  handleSearch: () => void
  handleSearchReset: () => void
  updateFilters: (newFilter: Partial<FiltersType>) => void
  handleFiltersReset: () => void
  checkboxesRef: any
}

const MovieFilters = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleSearchReset,
  updateFilters,
  handleFiltersReset,
  checkboxesRef,
}: Props) => {

  const yearsArray = getYears()
  const {filters} = useMovieFilters(emptyFilter)

  const {dataGenres, dataCountry, dataTypes} = useMovieData({
    page: filters.page,
    movie: filters.movie,
    year: filters?.year?.map(Number),
    genres: filters.genres,
    countries: filters.countries,
    type: filters.type,
    lists: "",
  })

  const arrCheckbox = useMemo(
    () => [
      { type: "genres", title: "Жанры", list: dataGenres },
      { type: "countries", title: "Страны", list: dataCountry },
      { type: "year", title: "Год", list: yearsArray },
      { type: "type", title: "Тип", list: dataTypes },
    ],
    [dataGenres, dataCountry, yearsArray, dataTypes],
  )

  return (
    <div className="xl:w-1/4 w-full">
      <h1 className={"text-4xl mb-14"}>Фильтры</h1>
      {window.screen.width >= 1024 && (
        <MovieSearch
          search={searchQuery}
          setSearch={setSearchQuery}
          handlerSearch={handleSearch}
          handlerSearchReset={handleSearchReset}
        />
      )}
      {arrCheckbox.map((item, key) => {
        const selectedValues = filters[item.type as keyof FiltersType]

        return (
          <Checkbox
            key={key}
            title={item.title}
            type={item.type}
            list={item.list}
            // @ts-ignore
            callbackValue={updateFilters}
            resetFilter={(resetFn: () => void) => {
              checkboxesRef.current[key] = resetFn
            }}
            // @ts-ignore
            selectedValues={Array.isArray(selectedValues) ? selectedValues : []}
          />
        )
      })}
      <Button
        className={"w-full"}
        onClick={handleFiltersReset}
        color={"danger"}
        size="lg"
      >
        Сбросить фильтры
      </Button>
    </div>
  )
}

export default MovieFilters
