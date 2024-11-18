import React, { useEffect, useState } from "react"
import { Select, SelectItem } from "@nextui-org/react"
import { movieStatusApi } from "../../app/services/movieStatusApi"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../app/slices/UserSlice"

const MovieSingleSelect = () => {

  const { id } = useParams()
  const user = useSelector(selectUser)
  const { data: statusMovieData } = movieStatusApi.useGetStatusQuery()
  const [deleteStatus] = movieStatusApi.useDeleteStatusMutation()
  const [setStatus] = movieStatusApi.useSetStatusMutation()
  const [patchStatus] = movieStatusApi.usePatchStatusMutation()

  const [statusMovieSelect, setStatusMovieSelect] = useState<
    string | undefined
  >()
  const getStatusMovie = (idMovie: number) => {
    return statusMovieData?.receivedMovieStatus.find(
      movie => movie.movie_id === idMovie,
    )
  }
  const statusMovie = getStatusMovie(+id!)

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


  const handlerDeleteStatus = async () => {
    try {
      await deleteStatus({ id: statusMovie?.id! })
      setStatusHandler()
      setStatusMovieSelect(undefined)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (statusMovieSelect) {
      setStatusHandler();
    }
  }, [statusMovieSelect]);

  useEffect(() => {
    // Обновляем статус фильма при изменении id
    if (statusMovie) {
      setStatusMovieSelect(statusMovie.status); // Устанавливаем статус, если он существует
    } else {
      setStatusMovieSelect(undefined); // Сбрасываем, если статус не найден
    }
  }, [id, statusMovie]);

  console.log('statusMovie',statusMovie)

  return (
    <Select
      isRequired
      placeholder="Выберите статус"
      className="max-w-xs w-full mb-10"
      selectedKeys={
        statusMovieSelect ? new Set([statusMovieSelect]) : undefined
      }
      defaultSelectedKeys={
        !statusMovieSelect && statusMovie ? new Set([statusMovie.status]) : undefined
      }
      onSelectionChange={keys => {
        const selectedKey = Array.from(keys).join("")
        setStatusMovieSelect(selectedKey)
      }}
    >
      <SelectItem key="PLANED">Буду смотреть</SelectItem>
      <SelectItem key="WATCHED">Просмотрено</SelectItem>
      <SelectItem key="DROPPED">Брошено</SelectItem>
      <SelectItem
        color={"danger"}
        key={"DELETE"}
        onClick={handlerDeleteStatus}
      >
        Удалить
      </SelectItem>
    </Select>
  )
}

export default MovieSingleSelect