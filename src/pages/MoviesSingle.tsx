import { useParams } from "react-router-dom"
import { moviesApi } from "../app/services/moviesApi"
import {
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@nextui-org/react"
import MovieCard from "../components/MovieCard"

import MovieSingleInfo from "../components/movieSingle/MovieSingleInfo"
import MovieSinglePerson from "../components/movieSingle/MovieSinglePerson"
import MovieSingleSelect from "../components/movieSingle/MovieSingleSelect"
import MovieSingleSimilar from "../components/movieSingle/MovieSingleSimilar"
import MovieSingleWatch from "../components/movieSingle/MovieSingleWatch"

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
            <h1 className={"text-4xl mb-5"}>
              {data.name ? data.name : data.names[0]?.name}
            </h1>
          </CardHeader>
          <CardBody>
            <MovieSingleInfo data={data} />
            <MovieSingleSelect/>
            <div className="flex gap-10">
              <MovieSinglePerson data={data} />
              <MovieSingleWatch id={data?.id} title={data.name}/>
            </div>
          </CardBody>
        </Card>
      </div>
      <MovieSingleSimilar data={data.similarMovies}/>
    </div>
  )
}

export default MoviesSingle
