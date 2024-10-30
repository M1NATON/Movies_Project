import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../app/slices/UserSlice"
import { useNavigate } from "react-router-dom"
import { Button, Select, SelectItem } from "@nextui-org/react"
import { moviesApi } from "../app/services/moviesApi"
import { movieStatusApi } from "../app/services/movieStatusApi"
import MovieCard from "../components/MovieCard"

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectStatusMovie, setSelectStatusMovie] = useState<{
    currentKey: string
  }>()
  const { data: movie } = movieStatusApi.useGetStatusQuery()
  const handlerLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/movies")
  }

  const myMovieId = movie?.receivedMovieStatus
    .filter(item => {
      if (selectStatusMovie) {
        return item.status === selectStatusMovie?.currentKey
      } else {
        return 1
      }
    })
    .map(item => item.movie_id)

  const { data: myMoviesData, status, refetch } = moviesApi.useMyMoviesQuery({
    id: myMovieId,
    page: 2,
  })
  useEffect(() => {
    refetch();
  }, [selectStatusMovie, refetch]);
  console.log('selectStatusMovie',selectStatusMovie?.currentKey)
  console.log('myMovieId', myMovieId)
  return (
    <div className={'mb-20'}>
      <div className="flex mb-20 justify-between items-center">
        <Select
          label="Выбирите статус фильма "
          className="max-w-xs"
          selectedKeys={selectStatusMovie}
          onSelectionChange={setSelectStatusMovie}
        >
          <SelectItem key={"PLANED"}>Буду смотреть</SelectItem>
          <SelectItem key={"WATCHED"}>Просмотрено</SelectItem>
          <SelectItem key={"DROPPED"}>Брошено</SelectItem>
        </Select>
        <Button onClick={handlerLogout}>Выйти</Button>
      </div>
      <div className="flex gap-5 flex-wrap">
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
            <h1 className={"text-4xl"}>Список пуст!</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
