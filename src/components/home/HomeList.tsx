import React from "react"
import { Card, CircularProgress } from "@nextui-org/react"
import MovieCard from "../MovieCard"
import MoviesPagination from "../movies/MoviesPagination"
import { MoviesType } from "../../type/moviesType"
import { FiltersType } from "../../type/filtersType"


type Props = {
  status: string,
  data: MoviesType
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  title: string
}

const HomeList = ({data, status, setFilters, title}: Props) => {


  return (
    <Card className={'p-5'}>
      <div>
        <div className={"mb-10"}>
          <h1 className={"text-4xl"}>{title}</h1>
          <p className={"text-white/40"}>По версии Кинопоиска.</p>
        </div>
        {/*{status === "pending" ? (*/}
        {/*  <div className={"w-fit mx-auto flex justify-center items-center"}>*/}
        {/*    <CircularProgress size={"lg"} aria-label="Loading..." />*/}
        {/*  </div>*/}
        {/*) : (*/}
          <div className="flex items-center flex-wrap gap-5">
            {data?.docs?.map(item => (
              <MovieCard
                key={item.id}
                title={item.name}
                image={item.poster.url}
                id={item.id}
              />
            ))}
          </div>
        {/*)}*/}
        <MoviesPagination
          type={''}
          pageTwo={data?.page || 1}
          status={status}
          setFilters={setFilters}
          dataFilter={data!}
          size={'lg'}
        />
      </div>
    </Card>
  )
}

export default HomeList