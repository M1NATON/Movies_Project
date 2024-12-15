import { useParams } from "react-router-dom"
import { moviesApi } from "../app/services/moviesApi"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"

import MovieSingleInfo from "../components/movieSingle/MovieSingleInfo"
import MovieSinglePerson from "../components/movieSingle/MovieSinglePerson"
import MovieSingleSelect from "../components/movieSingle/MovieSingleSelect"
import MovieSingleSimilar from "../components/movieSingle/MovieSingleSimilar"
import MovieSingleWatch from "../components/movieSingle/MovieSingleWatch"
import MovieSingleSeries from "../components/movieSingle/MovieSingleSeries"
import MovieSingleTrailer from "../components/movieSingle/MovieSingleTrailer"

const MoviesSingle = () => {
  const { id } = useParams()

  const { data } = moviesApi.useGetByIdMovieQuery(+id!)
  if (!data) return null

  const imageBack = () => {
    if(window.screen.width >=800 && window.screen.width <= 1200) {
      return data.backdrop.url
    } else {
      return data.poster.url
    }
  }

  return (
    <div>
      <div className="w-full z-20 flex-col h-1/2  xl:flex gap-40 mx-auto mb-16  md:flex-row">
        <div className="flex xl:w-1/3 w-[90%] md:mx-auto  flex-col items-center justify-center">
          <Image
            isBlurred
            src={`${imageBack()}`}
            alt="NextUI Album Cover"
            aria-label={"NextUI Album Cover"}
            className="m-5 object-cover"
          />
        </div>
        <Card className="text-sm z-20 sm:text-xl w-full xl:w-2/3 h-fit p-2 sm:p-6">
          <CardHeader>
            <h1 className={"text-4xl mb-5"}>
              {data.name ? data.name : data.names[0]?.name}
            </h1>
          </CardHeader>
          <CardBody>
            <MovieSingleInfo data={data} />
            <MovieSingleSelect />
            <div className="flex flex-wrap gap-5">
              <MovieSinglePerson data={data} />
              {data.videos && data.videos.trailers.length > 0 && (
                <MovieSingleTrailer data={data} />
              )}
              {
                data!.isSeries && <MovieSingleSeries data={data} />
              }
            </div>
          </CardBody>
        </Card>
      </div>
      <MovieSingleWatch id={data?.id} title={data.name} />
      <MovieSingleSimilar data={data.similarMovies} />
    </div>
  )
}

export default MoviesSingle
