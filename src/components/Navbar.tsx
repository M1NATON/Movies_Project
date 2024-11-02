import React, { useContext, useState } from "react"
import {
  Button,
  CircularProgress, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Navbar as NavbarNext,
  NavbarContent,
  NavbarItem
} from "@nextui-org/react"
import { NavLink, useNavigate } from "react-router-dom"
import { FaRegMoon, FaRegSun } from "react-icons/fa"
import { ThemeContext } from "../context/ThemeProvider"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../app/slices/UserSlice"
import { moviesApi } from "../app/services/moviesApi"

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const auth = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [fetchRandom, setFetchRandom] = useState(false)
  const { data, refetch, status } = moviesApi.useRandomMovieQuery(undefined, { skip: !fetchRandom })
  const handlerRandom = () => {
    setFetchRandom(true)
    refetch()
      .unwrap()
      .then((result) => {
        navigate(`/movie/${result.id}`)
      })
      .catch((err) => {
        console.error("Error fetching random movie:", err)
      })
  }

  const handlerLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <NavbarNext className={"mx-auto w-full"}>
      <NavbarContent
        id="sidebar"
        className="hidden w-fit mx-auto items-center sm:flex gap-10"
        justify="center"
      >
        <NavbarItem>
          <NavLink to={"/movies/1"} className={"text-2xl"}>
            Фильмы
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to={"/review"} className={"text-2xl"}>
            Обзоры
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <h1
            className={"text-2xl cursor-pointer flex gap-2 items-center"}
            onClick={handlerRandom}
          >
            <span>Случайный тайтл</span>
            {status === 'pending' && <CircularProgress size="sm" aria-label="Loading..." />}
          </h1>
        </NavbarItem>
        <NavbarItem>
          {auth ? (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                >
                  Профиль
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                  <NavLink to={"/profile"} >
                    Личный кабинет
                  </NavLink>
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger" onClick={handlerLogout} color="danger">
                  Выйти
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavLink to={"/auth"} className={"text-2xl"}>
              <Button>Войти</Button>
            </NavLink>
          )}
        </NavbarItem>
        <NavbarItem
          className={"lg:flex text-3xl cursor-pointer"}
          onClick={toggleTheme}
        >
          {theme === "light" ? <FaRegMoon /> : <FaRegSun />}
        </NavbarItem>
      </NavbarContent>
    </NavbarNext>
  )
}

export default Navbar
