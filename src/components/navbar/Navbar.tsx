import { useContext} from "react"
import {
  Navbar as NavbarNext,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { NavLink } from "react-router-dom"
import { FaRegMoon, FaRegSun } from "react-icons/fa"
import { ThemeContext } from "../../context/ThemeProvider"
import DropdownNavbar from "./DropdownNavbar"
import RandomMovieNavbar from "./RandomMovieNavbar"

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

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
          <RandomMovieNavbar />
        </NavbarItem>
        <NavbarItem>
          <DropdownNavbar />
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
