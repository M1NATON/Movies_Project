import React from "react"
import { Input } from "@nextui-org/react"
import { FiSearch } from "react-icons/fi"
import { GrPowerReset } from "react-icons/gr"
import { emptyFilter } from "../../features/emptyFilter"
import { useMovieFilters } from "../../hooks/useMovieFilters"

type Props = {
  search: string
  setSearch: (value: string) => void
  handlerSearch: () => void
  handlerSearchReset: () => void
}

const MovieSearch = ({
  handlerSearch,
  handlerSearchReset,
  search,
  setSearch,
}: Props) => {

  const {filters} = useMovieFilters(emptyFilter)

  const activeFilter =
    filters.genres!.length > 0 ||
    filters.year!.length > 0 ||
    filters.countries!.length > 0


  return (
    <div className={"flex justify-between items-start gap-2"}>
      <Input
        type="search"
        label="Поиск"
        value={search}
        onValueChange={setSearch}
        className={"mb-5 h-full"}
        isInvalid={activeFilter}
        onKeyPress={(event: any) => event.key === "Enter" && handlerSearch()}
        errorMessage="Сбросьте фильтры для поиска"
        disabled={activeFilter}
      />
      <div className="flex justify-between gap-2">
        <button
          className={
            "h-[56px] w-[56px] cursor-pointer p-2 rounded-xl bg-[#006fee] transition hover:bg-[#003e85]"
          }
          onClick={handlerSearch}
        >
          <FiSearch size={30} className={"mx-auto"} />
        </button>
        <button
          className={
            "h-[56px] w-[56px] cursor-pointer p-2 rounded-xl bg-[#db1057] transition hover:bg-[#a70c42]"
          }
          onClick={handlerSearchReset}
        >
          <GrPowerReset size={30} className={"mx-auto"} />
        </button>
      </div>
    </div>
  )
}

export default MovieSearch
