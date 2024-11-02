import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
import MovieSingleInfo from "../components/MovieSingleInfo"
import MovieSinglePerson from "../components/MovieSinglePerson"

const MoviesSingle = () => {
  const { id } = useParams()
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const { data } = moviesApi.useGetByIdMovieQuery(+id!)
  const { data: statusMovieData } = movieStatusApi.useGetStatusQuery()
  const getStatusMovie = (idMovie: number) => {
    return statusMovieData?.receivedMovieStatus.find(
      movie => movie.movie_id === idMovie,
    )
  }
  const statusMovie = getStatusMovie(+id!)
  const [statusMovieSelect, setStatusMovieSelect] = useState<
    string | undefined
  >()
  const [setStatus] = movieStatusApi.useSetStatusMutation()
  const [patchStatus] = movieStatusApi.usePatchStatusMutation()
  const setStatusHandler = async () => {
    try {
      if (statusMovie) {
        patchStatus({
          id: statusMovie.id!,
          status: {
            status: statusMovieSelect!,
          },
        })
      } else {
        setStatus({
          user_id: user?.id!,
          movie_id: +id!,
          status: statusMovieSelect!,
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
            <h1 className={"text-4xl mb-5"}>{data.name ? data.name : data.names[0].name}</h1>
          </CardHeader>
          <CardBody>
            <MovieSingleInfo data={data}/>
            <Select
              isRequired
              placeholder="Выберите статус"
              className="max-w-xs w-full mb-10"
              selectedKeys={
                statusMovieSelect ? new Set([statusMovieSelect]) : undefined
              }
              defaultSelectedKeys={
                statusMovie ? new Set([statusMovie.status]) : undefined
              }
              onSelectionChange={keys => {
                const selectedKey = Array.from(keys).join("")
                setStatusMovieSelect(selectedKey)
              }}
            >
              <SelectItem key="PLANED">Буду смотреть</SelectItem>
              <SelectItem key="WATCHED">Просмотрено</SelectItem>
              <SelectItem key="DROPPED">Брошено</SelectItem>
            </Select>
            <MovieSinglePerson data={data}/>
          </CardBody>
        </Card>
      </div>


      {data.similarMovies.length > 0 && (
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
