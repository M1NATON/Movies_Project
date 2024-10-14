import React, { useContext } from "react"
import {
  Navbar as NavbarNext,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { Link, NavLink } from "react-router-dom"
import { FaRegMoon, FaRegSun } from "react-icons/fa"
import { ThemeContext } from "../context/ThemeProvider"



const Navbar = () => {

  const { theme, toggleTheme } = useContext(ThemeContext)


  return (
    <NavbarNext className={'mx-auto w-fit'}>
      <NavbarContent
        id="sidebar"
        className="hidden sm:flex gap-10 "
        justify="center"
      >
        <NavbarItem>
          <NavLink to="/" className={"text-2xl"}>
            Новые резилы
          </NavLink>
        </NavbarItem>
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
          <NavLink to={"/profile"} className={"text-2xl"}>
            Профиль
          </NavLink>
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
