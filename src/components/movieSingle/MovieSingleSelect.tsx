import React, { useEffect, useState } from "react"
import { Select, SelectItem } from "@nextui-org/react"
import { movieStatusApi } from "../../app/services/movieStatusApi"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { logout, selectUser } from "../../app/slices/UserSlice"

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
      await deleteStatus({ id: statusMovie?.id! });
      setStatusMovieSelect(undefined); // Сброс выбранного статуса
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (statusMovie) {
      setStatusMovieSelect(statusMovie.status);
    } else {
      setStatusMovieSelect(undefined);
    }
  }, [id, statusMovie]);


  useEffect(() => {
    if (statusMovieSelect) {
      setStatusHandler();
    }
  }, [statusMovieSelect]);


  console.log('statusMovieSelect', statusMovieSelect)
  return (
    <Select
      isRequired
      placeholder="Выберите статус"
      className="max-w-xs w-full mb-10"
      selectedKeys={
        statusMovieSelect ? new Set([statusMovieSelect]) : new Set()
      }
      onSelectionChange={keys => {
        const selectedKey = Array.from(keys).join("");
        setStatusMovieSelect(selectedKey);
      }}
    >
      <SelectItem key="PLANED">Буду смотреть</SelectItem>
      <SelectItem key="WATCHED">Просмотрено</SelectItem>
      <SelectItem key="DROPPED">Брошено</SelectItem>
      {
        statusMovieSelect ? <SelectItem
          color={"danger"}
          key={"DELETE"}
          onClick={handlerDeleteStatus}
        >
          Удалить
        </SelectItem> : ''
      }

    </Select>

  )
}

export default MovieSingleSelect