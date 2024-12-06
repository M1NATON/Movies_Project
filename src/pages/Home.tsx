import { moviesApi } from "../app/services/moviesApi"
import React, { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import MoviesPagination from "../components/movies/MoviesPagination"
import { CircularProgress } from "@nextui-org/react"

const Home = () => {
  const { page = "1" } = useParams<{ page?: string }>()
  const [filters, setFilters] = useState<{
    lists: string
    year: number[]
    movie: string
    type: string[]
    page: number
    genres: string[]
    countries: string[]
  }>({
    page: +page,
    movie: "",
    year: [],
    genres: [],
    countries: [],
    type: [],
    lists: "top250",
  })

  const { data, status } = moviesApi.useFilterMoviesQuery(filters)
  const moviesData = data?.docs
  const navigate = useNavigate()
  const handlePageChange = (page: number) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page,
    }))
    navigate(`/${page}`)
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <div className={"mb-10"}>
        <h1 className={"text-4xl"}>Топ 250 фильмов</h1>
        <p className={"text-white/40"}>По версии Кинопоиска.</p>
      </div>
      {status === "pending" ? (
        <div className={"w-fit mx-auto flex justify-center items-center"}>
          <CircularProgress size={"lg"} aria-label="Loading..." />
        </div>
      ) : (
        <div className="flex items-center flex-wrap gap-5">
          {moviesData?.map(item => (
            <MovieCard
              key={item.id}
              title={item.name}
              image={item.poster.url}
              id={item.id}
            />
          ))}
        </div>
      )}
      <MoviesPagination
        status={status}
        handlePageChange={handlePageChange}
        dataFilter={data!}
        filters={filters}
      />
    </div>
  )
}

export default Home
