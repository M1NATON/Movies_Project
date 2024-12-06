import { Pagination } from "@nextui-org/react"
import { MoviesType } from "../../type/moviesType"

type Props = {
  status: string
  handlePageChange: (page: number) => void
  dataFilter: MoviesType
  filters: {
    page: number
    movie: string
    year: string[]
    genres: string[]
    countries: string[]
    type: string[]
    lists: string
  }
}

const MoviesPagination = ({filters, dataFilter, status, handlePageChange}: Props) => {
  return (
    <div className="w-fit mx-auto mt-14 mb-14">
      {status === "fulfilled" && (
        <Pagination
          onChange={handlePageChange}
          total={dataFilter?.pages || 0}
          initialPage={filters.page}
          size={"lg"}
        />
      )}
    </div>
  )
}

export default MoviesPagination