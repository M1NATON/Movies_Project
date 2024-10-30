import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { moviesApi } from "../app/services/moviesApi"
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Select,
  SelectItem,
  User,
} from "@nextui-org/react"
import MovieCard from "../components/MovieCard"
import { movieStatusApi } from "../app/services/movieStatusApi"

import { useSelector } from "react-redux"
import { selectUser } from "../app/slices/UserSlice"

const MoviesSingle = () => {
  const { id } = useParams()
  const user = useSelector(selectUser)
  const { data } = moviesApi.useGetByIdMovieQuery(+id!)
  const { data: statusMovieData } = movieStatusApi.useGetStatusQuery()
  const getStatusMovie = (idMovie: number) => {
    return statusMovieData?.receivedMovieStatus.find(
      movie => movie.movie_id === idMovie,
    )
  }
  const statusMovie = getStatusMovie(+id!)
  const [statusMovieSelect, setStatusMovieSelect] = useState<{currentKey: string}>()
  const [setStatus] = movieStatusApi.useSetStatusMutation()
  const [patchStatus] = movieStatusApi.usePatchStatusMutation()
  const setStatusHandler = async () => {
    try {
      if (statusMovie) {
        patchStatus({
          id: statusMovie.id!,
          status: { status: statusMovieSelect?.currentKey!
        }
        })
      } else {
        setStatus({
          user_id: user?.id!,
          movie_id: +id!,
          status: statusMovieSelect?.currentKey!
        })
      }
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    setStatusHandler()
  }, [setStatusMovieSelect, statusMovieSelect])

  if (!data) return null
  return (
    <div>
      <div className="w-full mx-auto flex mb-16 gap-40 ">
        <div className="flex w-1/3 flex-col items-center justify-center">
          <Image
            isBlurred
            src={`${data.poster.url}`}
            alt="NextUI Album Cover"
            aria-label={"NextUI Album Cover"}
            className="m-5  object-cover"
          />
        </div>

        <Card className="text-xl w-2/3 h-fit p-6">
          <CardHeader>
            <h1 className={"text-4xl mb-5"}>{data.name}</h1>
          </CardHeader>
          <CardBody>
            {data.genres.length > 0 && (
              <p className={"border-b-1 w-fit"}>
                Жанры:{" "}
                {data.genres.map((i, idx) => (
                  <span key={idx}> {i.name}</span>
                ))}
              </p>
            )}
            {data.countries.length > 0 && (
              <p className={"border-b-1 w-fit"}>
                Страна производство:{" "}
                {data.countries.map((i, idx) => (
                  <span key={idx}> {i.name}</span>
                ))}
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
                <li className={"border-b-1 w-fit"}>
                  Рейтинг кинопоиска: {data.rating.kp.toFixed(1)}/10
                </li>
                <li className={"border-b-1 w-fit"}>
                  Рейтинг imbd: {data.rating.imdb}/10
                </li>
              </ul>
            )}
            {data.description && (
              <p className={"mb-5"}>Описание: {data.description}</p>
            )}
            <Select
              isRequired
              placeholder="Выбирите статус"
              className="max-w-xs  w-full"
              selectedKeys={statusMovieSelect}
              defaultSelectedKeys={[`${getStatusMovie(+id!)?.status}`]}
              onSelectionChange={setStatusMovieSelect}
            >
              <SelectItem key={"PLANED"}>Буду смотреть</SelectItem>
              <SelectItem key={"WATCHED"}>Просмотрено</SelectItem>
              <SelectItem key={"DROPPED"}>Брошено</SelectItem>
            </Select>
          </CardBody>
        </Card>
      </div>
      {data.persons && (
        <div className={"mb-10"}>
          <h1 className={"text-4xl mb-5"}>Над проектом работали:</h1>
          <div className="flex flex-wrap items-center mx-auto gap-5">
            {data.persons.length > 0 &&
              data.persons.map((item, idx) => (
                <User
                  name={item.name}
                  description={item.profession}
                  avatarProps={{ src: item.photo }}
                  key={idx}
                />
              ))}
          </div>
        </div>
      )}
      {data.similarMovies && (
        <div className="">
          <h1 className={"text-4xl mb-20"}>Похожие:</h1>
          <div className="flex flex-wrap mx-auto gap-20">
            {data.similarMovies.length > 0 &&
              data.similarMovies.map((item, idx) => (
                <MovieCard
                  key={idx}
                  title={item.name}
                  image={item.poster.url}
                  id={item.id}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MoviesSingle
