import React from "react"
import { useParams } from "react-router-dom"
import { moviesApi } from "../app/services/moviesApi"
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react"
import MovieCard from "../components/MovieCard"


const MoviesSingle = () => {
  const { id } = useParams()

  const { data } = moviesApi.useGetByIdMovieQuery(+id!)

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
                {data.genres.map(i => (
                  <span>{i.name}</span>
                ))}
              </p>
            )}
            {data.countries.length > 0 && (
              <p className={"border-b-1 w-fit"}>
                Страна производство:{" "}
                {data.countries.map(i => (
                  <span>{i.name}</span>
                ))}
              </p>
            )}
            {data.ageRating && (
              <p className={"border-b-1 w-fit mb-4"}>
                Возрастной рейтинг: {data.ageRating}
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
                  Рейтинг кинопоиска: {data.rating.kp}/10
                </li>
                <li className={"border-b-1 w-fit"}>
                  Рейтинг imbd: {data.rating.imdb}/10
                </li>
              </ul>
            )}
            {data.description && <p className={'mb-5'}>Описание: {data.description}</p>}
            <Select
              isRequired
              placeholder="Select an animal"
              defaultSelectedKeys={["Буду смотреть"]}
              className="max-w-xs  w-full"
            >
              <SelectItem key={"Буду смотреть"}>Буду смотреть</SelectItem>
              <SelectItem key={"Просмотрено"}>Просмотрено</SelectItem>
              <SelectItem key={"Брошено"}>Брошено</SelectItem>
            </Select>
          </CardBody>
        </Card>
      </div>

      <div className="">
        <h1 className={'text-4xl mb-20'}>Похожие:</h1>
        <div className="flex flex-wrap gap-20">
          {
            data.similarMovies.length > 0 && data.similarMovies.map((item) => (
              <MovieCard key={item.id} title={item.name} image={item.poster.url} id={item.id}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default MoviesSingle
