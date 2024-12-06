import { Card, CardBody, NavbarContent, NavbarItem } from "@nextui-org/react"
import { NavLink } from "react-router-dom"
import RandomMovieNavbar from "./RandomMovieNavbar"
import DropdownNavbar from "./DropdownNavbar"
import { FaRegMoon } from "react-icons/fa"
import { Navbar as NavbarNext } from "@nextui-org/navbar"
import { ThemeContext } from "../../context/ThemeProvider"
import { CiLight } from "react-icons/ci"
import React, { useContext } from "react"
import { CiSearch } from "react-icons/ci"
import NavbarSearch from "./NavbarSearch"

const NavbarDecstop = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className={"flex container mx-auto items-center"}>
      <ul className={"flex gap-5 items-center"}>
        <li>
          <RandomMovieNavbar />
        </li>
        <li>
          <NavbarSearch/>
        </li>
        <li
          className={"lg:flex items-center text-3xl cursor-pointer"}
          onClick={toggleTheme}
        >
          {" "}
          {theme === "light" ? <FaRegMoon size={30} /> : <CiLight size={40} />}
        </li>
      </ul>
      <NavbarNext className={"mx-auto md:2xl  w-full"}>
        <NavbarContent
          id="sidebar"
          className=" w-fit text-[12px] mx-auto items-center sm:flex gap-10"
          justify="center"
        >
          <NavbarItem>
            <NavLink to={"/"} className={"text-2xl"}>
              Главная
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
        </NavbarContent>
      </NavbarNext>
      <ul>
        <li>
          <DropdownNavbar />
        </li>
      </ul>
    </div>
  )
}

export default NavbarDecstop
