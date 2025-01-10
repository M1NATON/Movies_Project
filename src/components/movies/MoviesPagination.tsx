import { Pagination } from "@nextui-org/react"
import { MoviesType } from "../../type/moviesType"
import { FiltersType } from "../../type/filtersType"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useMovieData } from "../../hooks/useMovieData"

type Props = {
  status: string
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  dataFilter: MoviesType
  type: string
  pageTwo: number
  size: "sm" | "md" | "lg" | undefined
}

const MoviesPagination = ({
  dataFilter,
  status,
  setFilters,
  type,
  pageTwo,
  size,
}: Props) => {
  const navigate = useNavigate()
  const { page = "1" } = useParams<{ page?: string }>()
  const [pageNum, setPageNum] = useState(+page)
  const handlePageChange = (page: number) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page,
    }))
    if (type) {
      navigate(`${type}/${page}`)
    }
    // window.scrollTo(0, 0)
  }

  useEffect(() => {
    setPageNum(+page)
  }, [page])
  console.log("pageNum", pageNum)
  console.log("pageTwo", pageTwo)
  return (
    <div className="w-fit mx-auto mt-14 mb-14">
      {status === "fulfilled" && (
        <Pagination
          onChange={handlePageChange}
          total={dataFilter?.pages || 0}
          page={pageTwo}
          size={size}
          isCompact={!type}
          showControls={!type}
        />
      )}
    </div>
  )
}

export default MoviesPagination
