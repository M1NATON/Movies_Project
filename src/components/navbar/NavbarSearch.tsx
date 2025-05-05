import React, { useContext, useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import {
  Button, CircularProgress,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react"
import { ThemeContext } from "../../context/ThemeProvider"
import { textColorTheme } from "../../features/textColorTheme"
import { FiSearch } from "react-icons/fi"
import { GrPowerReset } from "react-icons/gr"
import { useNavigate, useParams } from "react-router-dom"
import { moviesApi } from "../../app/services/moviesApi"
import MovieCard from "../MovieCard"
import Slider from "react-slick"
import { div } from "framer-motion/client"


type Props = {
  closeModal: () => void
}


const NavbarSearch = () => {



  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { page = "1" } = useParams<{ page?: string }>()
  const [invis, setInvis] = useState<boolean>(false)
  const { theme } = useContext(ThemeContext)
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<{
    page: number
    movie: string
  }>({
    page: +page,
    movie: "",
  })
  const { data: dataFilter, status } = moviesApi.useFilterMoviesQuery({
    page: filters.page,
    movie: filters.movie,
  })

  const handlerSearch = () => {
    setInvis(true)
    setFilters(prevFilters => ({
      ...prevFilters,
      page: 1,
      movie: search,
    }))
  }
  const handlerSearchReset = () => {
    setInvis(false)
    setSearch('')
    setFilters({
      page: 1,
      movie: "",
    })
  }
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handlerSearch()
    }
  }


  const numScroll = () => {
    if (window.screen.width < 800) {
      return 1
    } else if (window.screen.width < 1200) {
      return 2
    } else {
      return 3
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: numScroll(),
    slidesToScroll: numScroll()
  };

  useEffect(() => {
    handlerSearchReset()
  }, [isOpen])

  return (
    <>
      <CiSearch onClick={onOpen} className={"cursor-pointer"} size={40} />
      <Modal
        className={`${theme} ${textColorTheme()} px-5`}
        isOpen={isOpen}
        size={'5xl'}
        onOpenChange={onOpenChange}
        placement={'center'}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Поиск</ModalHeader>
              <ModalBody>
                <div className={"flex justify-between items-start gap-2"}>
                  <Input
                    type="search"
                    label="Поиск"
                    value={search}
                    onValueChange={setSearch}
                    className={"mb-5 h-full"}
                    onKeyPress={handleKeyPress}
                    errorMessage="Сбросьте фильтры для поиска"
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
                {
                  invis && (
                    status === 'fulfilled' ? (
                      <div className="slider-container">
                        <Slider {...settings}>
                          {
                            dataFilter?.docs.map(item => (
                              <div onClick={onClose}>
                                <MovieCard
                                  
                                  title={item.name}
                                  image={item.poster.url}
                                  id={item.id}
                                />
                              </div> 
                            ))
                          }
                        </Slider>
                      </div>
                    ) : (
                      <CircularProgress size={"lg"} aria-label="Loading..." />
                    )
                  )

                }

              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default NavbarSearch
