import React, { useState } from "react"
import { Movie } from "../../type/moviesType"
import { TypeMovieRu } from "../../features/TypeMovieRu"
import {Slider} from "@nextui-org/react";
import { GiConfirmed } from "react-icons/gi";
import { reviewApi } from "../../app/services/reviewApi"
import { useSelector } from "react-redux"
import { selectUser } from "../../app/slices/UserSlice"


type Props = {
  data: Movie
}

const MovieSingleInfo: React.FC<Props> = ({ data }) => {

  const [rating, setRating] = useState(0)
  const user = useSelector(selectUser)
  const [createReview] = reviewApi.useCreateReviewsMutation()

  const handleRating = () => {
    try {
      createReview({
        user_id: user?.id,
        movie_id: data.id,
        rating: rating,
        description: ''
      })
    } catch (e) {
      console.log(e)
    }

  }




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

        <p className={'w-full mb-5 flex gap-5 items-end'}>
          {/*<Slider*/}
          {/*  className="max-w-md"*/}
          {/*  onChange={setRating}*/}
          {/*  value={rating}*/}
          {/*  defaultValue={0}*/}
          {/*  label="Оценка"*/}
          {/*  maxValue={10}*/}
          {/*  minValue={0}*/}
          {/*  showSteps={true}*/}
          {/*  size="lg"*/}
          {/*  step={1}*/}
          {/*/>*/}
          <button onClick={handleRating}>
            <GiConfirmed size={40} color={'#006fee'}/>
          </button>
        </p>
    </>
  )
}

export default MovieSingleInfo
