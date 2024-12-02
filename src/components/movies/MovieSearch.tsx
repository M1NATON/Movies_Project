import React from "react";
import { Input } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  selectedFilters: {
    genres: string[];
    year: string[];
    countries: string[];
  };
  handlerSearch: () => void;
  handlerSearchReset: () => void;
};

const MovieSearch = ({
                       handlerSearch,
                       handlerSearchReset,
                       search,
                       setSearch,
                       selectedFilters,
                     }: Props) => {


  const handleKeyPress = (event: any) => {
    if(event.key === 'Enter'){
      handlerSearch()
    }
  };

  return (
    <div className={"flex justify-between items-start gap-2"}>
      <Input
        type="search"
        label="Поиск"
        value={search}
        onValueChange={setSearch}
        className={"mb-5 h-full"}
        isInvalid={
          selectedFilters.genres.length > 0 ||
          selectedFilters.year.length > 0 ||
          selectedFilters.countries.length > 0
        }
        onKeyPress={handleKeyPress}
        errorMessage="Сбросьте фильтры для поиска"
        disabled={
          selectedFilters.genres.length > 0 ||
          selectedFilters.year.length > 0 ||
          selectedFilters.countries.length > 0
        }
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
  );
};

export default MovieSearch;
