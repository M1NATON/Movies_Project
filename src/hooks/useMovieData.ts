import { moviesApi } from "../app/services/moviesApi"
import { FiltersType } from "../type/filtersType"

export const useMovieData = (initialFilters: FiltersType) => {
  const { data: dataGenres } = moviesApi.useAllGenresQuery()
  const { data: dataTypes } = moviesApi.useAllTypesQuery()
  const { data: dataCountry } = moviesApi.useAllCountryQuery()
  const {
    data: dataFilter,
    status,
    refetch: refetchFilter,
  } = moviesApi.useFilterMoviesQuery({
    page: initialFilters.page,
    movie: initialFilters.movie,
    year: initialFilters?.year?.map(Number),
    genres: initialFilters.genres,
    countries: initialFilters.countries,
    type: initialFilters.type,
    lists: "",
  })

  return {
    dataGenres,
    dataTypes,
    dataCountry,
    dataFilter,
    status,
    refetchFilter,
  }
}
