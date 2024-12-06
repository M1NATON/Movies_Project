import MovieSearch from "./MovieSearch";
import Checkbox from "../Checkbox";
import { Button } from "@nextui-org/react";

type Filters = {
  page: number;
  movie: string;
  year: string[];
  genres: string[];
  countries: string[];
  type: string[];
  lists: string;
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  handleSearchReset: () => void;
  updateFilters: (newFilter: Partial<Filters>) => void;
  handleFiltersReset: () => void;
  arrCheckbox: (
    | {
    type: string;
    title: string;
    list: [{ name: string; slug: string }] | undefined;
  }
    | {
    type: string;
    title: string;
    list: { name: string; slug: string }[];
  }
    )[];
  checkboxesRef: any;
};

const MovieFilters = ({
                        filters,
                        setFilters,
                        searchQuery,
                        setSearchQuery,
                        handleSearch,
                        handleSearchReset,
                        updateFilters,
                        handleFiltersReset,
                        arrCheckbox,
                        checkboxesRef,
                      }: Props) => {
  return (
    <div className="xl:w-1/4 p-5 w-full">
      <h1 className={"text-4xl mb-14"}>Фильтры</h1>
      {window.screen.width >= 1024 && (
        <MovieSearch
          search={searchQuery}
          setSearch={setSearchQuery}
          selectedFilters={filters}
          handlerSearch={handleSearch}
          handlerSearchReset={handleSearchReset}
        />
      )}
      {arrCheckbox.map((item, key) => {
        const selectedValues = filters[item.type as keyof Filters];
        return (
          <Checkbox
            key={key}
            title={item.title}
            type={item.type}
            list={item.list}
            callbackValue={updateFilters}
            resetFilter={(resetFn: () => void) => {
              checkboxesRef.current[key] = resetFn;
            }}
            selectedValues={Array.isArray(selectedValues) ? selectedValues : []}
          />
        );
      })}
      <Button
        className={"w-full"}
        onClick={handleFiltersReset}
        color={"danger"}
        size="lg"
      >
        Сбросить фильтры
      </Button>
    </div>
  );
};

export default MovieFilters;
