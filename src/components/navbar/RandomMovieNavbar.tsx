import React, { useEffect, useState } from "react"
import { Button, CircularProgress, Tooltip } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { moviesApi } from "../../app/services/moviesApi"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"

const RandomMovieNavbar = () => {
  const navigate = useNavigate()
  const [fetchRandom, setFetchRandom] = useState(false)
  const { data, status, refetch } = moviesApi.useRandomMovieQuery(undefined, {
    skip: !fetchRandom,
  })
  const handlerRandom = async () => {
    try {
      await setFetchRandom(true)
      refetch()
      if (status === "fulfilled" && data) {
        navigate(`/movie/${data?.id}`)
      }
    } catch (err) {
      console.error("Error fetching random movie:", err)
    }
  }

  useEffect(() => {
    if (status === "fulfilled" && data) {
      navigate(`/movie/${data?.id}`)
    }
  }, [data])

  return (
    <div>
      {status === "pending" ? (
        <CircularProgress size="sm" aria-label="Loading..." />
      ): (
        <GiPerspectiveDiceSixFacesRandom
          onClick={handlerRandom}
          className={"cursor-pointer"}
          size={50}
        />
      )}
    </div>
  )
}

export default RandomMovieNavbar
