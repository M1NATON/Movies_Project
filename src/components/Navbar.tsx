import React, { useContext } from "react"
import {
  Button,
  Navbar as NavbarNext,
  NavbarContent,
  NavbarItem
} from "@nextui-org/react"
import { Link, NavLink } from "react-router-dom"
import { FaRegMoon, FaRegSun } from "react-icons/fa"
import { ThemeContext } from "../context/ThemeProvider"
import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../app/slices/UserSlice"



const Navbar = () => {

  const { theme, toggleTheme } = useContext(ThemeContext)
  const auth = useSelector(selectIsAuthenticated)

  return (
    <NavbarNext className={'mx-auto w-full'}>
      <NavbarContent
        id="sidebar"
        className="hidden w-fit mx-auto items-center sm:flex gap-10 "
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
          {
            auth ? (
              <NavLink to={"/profile"} className={"text-2xl"}>
                Профиль
              </NavLink>
            ) : (
              <NavLink to={"/auth"} className={"text-2xl"}>
                <Button>

                  Войти
                </Button>
              </NavLink>
            )
          }
        </NavbarItem>
        <NavbarItem
          className={"lg:flex text-3xl cursor-pointer"}
          onClick={() => toggleTheme()}
        >
          {theme && theme === "light" ? <FaRegMoon /> : <FaRegSun />}
        </NavbarItem>
      </NavbarContent>
    </NavbarNext>
  )
}

export default Navbar
