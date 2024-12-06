import React, { useState } from "react"
import MovieSearch from "./MovieSearch"
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react"
import { FaFilter } from "react-icons/fa"
import MovieFilters from "./MovieFilters"

type Filters = {
  page: number
  movie: string
  year: string[]
  genres: string[]
  countries: string[]
  type: string[]
  lists: string
}

type Props = {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  handleSearch: () => void
  handleSearchReset: () => void
  updateFilters: (newFilter: Partial<Filters>) => void
  handleFiltersReset: () => void
  arrCheckbox: (
    | {
        type: string
        title: string
        list: [{ name: string; slug: string }] | undefined
      }
    | {
        type: string
        title: string
        list: { name: string; slug: string }[]
      }
  )[]
  checkboxesRef: any
}

const MovieFiltersMobail = ({
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [temporaryFilters, setTemporaryFilters] = useState(filters)

  const handleModalOpen = () => {
    setTemporaryFilters(filters)
    onOpen()
  }


  return (
    <div className={"mb-10"}>
      <MovieSearch
        search={searchQuery}
        setSearch={setSearchQuery}
        selectedFilters={filters}
        handlerSearch={handleSearch}
        handlerSearchReset={handleSearchReset}
      />
      <Card className={"w-full text-center p-4 cursor-pointer"}>
        <button
          onClick={handleModalOpen}
          className={"flex justify-center gap-2 items-center"}
        >
          <h1 className={"text-3xl"}>Фильтры</h1>
          <FaFilter size={30} />
        </button>
      </Card>
      <Modal
        className={"dark text-white"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalBody>
                <MovieFilters
                  filters={temporaryFilters}
                  setFilters={setFilters}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                  handleSearchReset={handleSearchReset}
                  updateFilters={updateFilters}
                  handleFiltersReset={handleFiltersReset}
                  arrCheckbox={arrCheckbox.map(item => ({
                    ...item,
                    selectedValues:
                      temporaryFilters[item.type as keyof Filters] || [],
                  }))}
                  checkboxesRef={checkboxesRef}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MovieFiltersMobail
