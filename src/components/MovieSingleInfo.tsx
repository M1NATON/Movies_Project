import React from "react"
import { Movie } from "../type/moviesType"

type Props = {
  data: Movie
}

const MovieSingleInfo:React.FC<Props> = ({data}) => {


  return (
    <>
      {data?.genres.length > 0 && (
        <p className={"border-b-1 w-fit"}>
          Жанры: {data.genres.map(genre => genre.name).join(', ')}
        </p>
      )}
      {data?.countries.length > 0 && (
        <p className={"border-b-1 w-fit"}>
          Страна производство: {data.countries.map(genre => genre.name).join(', ')}
        </p>
      )}
      {data.ageRating && (
        <p className={"border-b-1 w-fit mb-4"}>
          Возрастной рейтинг: {data.ageRating}+
        </p>
      )}
      {data.year && (
        <p className={"border-b-1 w-fit mb-4"}>Год: {data.year}</p>
      )}
      {data.movieLength && (
        <p className={"border-b-1 w-fit mb-4"}>
          Продолжительность: {data.movieLength} минут
        </p>
      )}
      {data.type && (
        <p className={"border-b-1 w-fit mb-4"}>Тип: {data.type}</p>
      )}
      {data.rating && (
        <ul className={"mb-4"}>
          {data.rating.kp ? (
            <li className={"border-b-1 w-fit"}>
              Рейтинг кинопоиска: {data.rating.kp.toFixed(1)}/10
            </li>
          ) : ''}
          {data.rating.imdb ? (
            <li className={"border-b-1 w-fit"}>
              Рейтинг imbd: {data.rating.imdb}/10
            </li>
          ) : ''}
        </ul>
      )}
      {data.description && (
        <p className={"mb-5"}>Описание: {data.description}</p>
      )}
    </>
  )
}

export default MovieSingleInfo