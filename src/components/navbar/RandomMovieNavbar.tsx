import React, { useEffect, useState } from "react"
import { CircularProgress } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { moviesApi } from "../../app/services/moviesApi"

const RandomMovieNavbar = () => {
  const navigate = useNavigate()
  const [fetchRandom, setFetchRandom] = useState(false)
  const { data, status } = moviesApi.useRandomMovieQuery(undefined, {
    skip: !fetchRandom,
  })
  const handlerRandom = async () => {
    try {
      await setFetchRandom(true)
      if (status === "fulfilled" && data) {
        navigate(`/movie/${data?.id}`)
      }
    } catch (err) {
      console.error("Error fetching random movie:", err)
    }
  }

  useEffect(() => {
    if (data?.id) {
      navigate(`/movie/${data?.id}`)
    }
  }, [data])

  return (
    <h1
      className={"text-2xl cursor-pointer flex gap-2 items-center"}
      onClick={handlerRandom}
    >
      <span>Случайный тайтл</span>
      {status === "pending" && (
        <CircularProgress size="sm" aria-label="Loading..." />
      )}
    </h1>
  )
}

export default RandomMovieNavbar
