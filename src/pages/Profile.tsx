import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../app/slices/UserSlice"
import { useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Card,
  CircularProgress,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { moviesApi } from "../app/services/moviesApi"
import { movieStatusApi } from "../app/services/movieStatusApi"
import MovieCard from "../components/MovieCard"

const Profile = () => {

  const [selectStatusMovie, setSelectStatusMovie] = useState<
    string | undefined
  >()
  const [pageNumber, setPageNumber] = useState<number>()
  const { data: movie } = movieStatusApi.useGetStatusQuery()
  const { page = "1" } = useParams<{ page?: string }>()
  const [currentPage, setCurrentPage] = useState(page)

  const myMovieId = movie?.receivedMovieStatus
    .filter(item =>
      selectStatusMovie ? item.status === selectStatusMovie : true,
    )
    .map(item => item.movie_id)
    .filter((id): id is number => id !== undefined)

  const {
    data: myMoviesData,
    status,
    refetch,
  } = moviesApi.useMyMoviesQuery({
    id: myMovieId,
    page: +currentPage,
  })

  useEffect(() => {
    refetch()
  }, [selectStatusMovie, refetch])

  const pageHandler = (page: number) => {
    setCurrentPage(page.toString())
    window.scrollTo(0, 0)
  }

  return (
    <div className="mb-20 gap-5  w-full">
      <div className="mb-20 ">
        <Select
          label="Выбирите статус фильма"
          className="max-w-xs w-full"
          selectedKeys={selectStatusMovie ? [selectStatusMovie] : []}
          onSelectionChange={keys =>
            setSelectStatusMovie(Array.from(keys)[0] as string)
          }
        >
          <SelectItem key="PLANED">Буду смотреть</SelectItem>
          <SelectItem key="WATCHED">Просмотрено</SelectItem>
          <SelectItem key="DROPPED">Брошено</SelectItem>
        </Select>

      </div>
      <div className="">
        <div className="flex mb-20 justify-center gap-10 flex-wrap ">
          {status !== "rejected" ? (
            myMoviesData?.docs.map((item, index) => (
              <MovieCard
                key={index}
                title={item.name}
                image={item.poster.url}
                id={item.id}
              />
            ))
          ) : (
            <div>
              <h1 className="text-4xl">Список пуст!</h1>
            </div>
          )}
          {status === "pending" && (
            <CircularProgress size={"lg"} aria-label="Loading..." />
          )}
        </div>
        <div className={"w-fit mx-auto"}>
          {myMoviesData?.pages! > 1 && (
            <Pagination
              onChange={pageHandler}
              total={myMoviesData?.pages || 1}
              initialPage={pageNumber !== +page ? 1 : pageNumber}
              size={"lg"}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
