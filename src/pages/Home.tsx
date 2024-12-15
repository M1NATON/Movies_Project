import { moviesApi } from "../app/services/moviesApi"
import { useState } from "react"
import { FiltersType } from "../type/filtersType"
import { emptyFilter } from "../features/emptyFilter"
import HomeList from "../components/home/HomeList"

import backImg from "../../img/topBackImg.jpg"
import { Card, Image } from "@nextui-org/react"

const Home = () => {
  const [filters, setFilters] = useState<FiltersType>({
    ...emptyFilter,
    lists: "top250",
    limit: "3",
  })

  const { data: dataTop, status: statusTop } =
    moviesApi.useFilterMoviesQuery(filters)

  return (
    <div>
      <div>
        <div
          className={` w-full mb-20 h-fit relative  bg-cover `}
        >
          <Image
            isBlurred
            className={'h-full'}
            src={'../../img/topBackImg.jpg'}
          />
          <div className={'top-0 left-0 right-0 bottom-0 z-20 absolute flex justify-center items-center bg-black/30 backdrop-blur-sm p-5'}>
            <h1 className={'xl:text-[126px] font-bold text-center text-6xl blur-0'}>ТОП 250 ФИЛЬМОВ</h1>
          </div>
        </div>
      </div>
      <HomeList
        status={statusTop}
        data={dataTop!}
        setFilters={setFilters}
        title={"Топ 250 фильмов"}
      />
    </div>
  )
}

export default Home
