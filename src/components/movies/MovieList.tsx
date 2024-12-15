import React from "react"
import MovieCard from "../MovieCard"
import { CircularProgress } from "@nextui-org/react"
import { Movie } from "../../type/moviesType"


type Props = {
  movies: Movie[]
  status: string
}

const MovieList = ({status, movies}:Props) => {
  return (
    <div className="xl:w-3/4 w-full mx-auto">
      {status === "fulfilled" ? (
        <>
          <h1 className={"text-4xl mb-14 pl-11"}>Фильмы</h1>
          <div className={"flex mx-auto flex-wrap gap-5"}>
            {movies.length > 0 ? (
              movies.map((movie, index) => (
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
        <div className={"w-fit mx-auto flex justify-center items-center"}>
          <CircularProgress size={"lg"} aria-label="Loading..." />
        </div>
      )}
    </div>
  )
}

export default MovieList