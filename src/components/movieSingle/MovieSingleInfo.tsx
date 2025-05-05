
import { TypeMovieRu } from "../../features/TypeMovieRu"
import type { Movie } from "../../type/moviesType"


type Props = {
  data: Movie
}

const MovieSingleInfo: React.FC<Props> = ({ data }) => {


  return (
    <>
      {data?.genres.length > 0 && (
        <p className={" w-fit"}>
          Жанры: {data.genres.map(genre => genre.name).join(", ")}
        </p>
      )}
      {data?.countries.length > 0 && (
        <p className={" w-fit"}>
          Страна производство:{" "}
          {data.countries.map(genre => genre.name).join(", ")}
        </p>
      )}
      {data.type && (
        <p className={" w-fit mb-2"}>Тип: {TypeMovieRu(data.type)}</p>
      )}
      {data.year && <p className={" w-fit"}>Год: {data.year}</p>}

      {data.isSeries &&
        data.releaseYears.map(item => (
          <p className={" w-fit "}>
            Сериал выходил с {item.start} по {item.end}
          </p>
        ))}
      {data.ageRating && (
        <p className={" w-fit mb-2"}>Возрастной рейтинг: {data.ageRating}+</p>
      )}
      {data.movieLength && (
        <p className={" w-fit"}>Продолжительность: {data.movieLength} минут</p>
      )}

      {data.rating && (
        <ul className={"mb-5"}>
          {data.rating.kp ? (
            <li className={"w-fit"}>
              Рейтинг кинопоиска: {data.rating.kp.toFixed(1)}/10
            </li>
          ) : (
            ""
          )}
          {data.rating.imdb ? (
            <li className={" w-fit"}>Рейтинг imbd: {data.rating.imdb}/10</li>
          ) : (
            ""
          )}
        </ul>
      )}
      {data.description && (
        <p className={"mb-5"}>Описание: {data.description}</p>
      )}
    </>
  )
}

export default MovieSingleInfo
