import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import React, { useContext } from "react"
import { ThemeContext } from "../../context/ThemeProvider"
import { CiLight } from "react-icons/ci"
import { Link, NavLink, useNavigate } from "react-router-dom"
import RandomMovieNavbar from "./RandomMovieNavbar"
import { logout, selectIsAuthenticated } from "../../app/slices/UserSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import NavbarSearch from "./NavbarSearch"

const NavbarMobile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const auth = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handlerLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar>
      <NavbarContent className={"flex justify-between items-center"}>
        <NavbarItem>
          <RandomMovieNavbar />
        </NavbarItem>
        <NavbarItem>
          <NavbarSearch/>
        </NavbarItem>
        <NavbarItem className={"ml-auto"}>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Меню</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">
                <Link to={"/"}>Главная</Link>
              </DropdownItem>
              <DropdownItem key="new">
                <Link to={"/movies"}>Фильмы</Link>
              </DropdownItem>
              <DropdownItem key="copy">
                <Link to={"/movies"}>Обзоры</Link>
              </DropdownItem>
              <DropdownItem
                key="edit"
                className={"lg:flex text-3xl cursor-pointer"}
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <span className={"flex items-center gap-2"}>
                    Темный режим <FaRegMoon size={14} />
                  </span>
                ) : (
                  <span className={"flex items-center gap-2"}>
                    Светлый режим <CiLight size={20} />
                  </span>
                )}
              </DropdownItem>
              <DropdownItem>
                {auth && <NavLink to={"/profile"}>Личный кабинет</NavLink>}
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                onClick={handlerLogout}
                color="danger"
              >
                {auth && <span>Выйти</span>}
              </DropdownItem>
              <DropdownItem>
                {!auth && (
                  <NavLink to={"/auth"}>
                    Войти
                  </NavLink>
                )}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavbarMobile

// {auth ? (
//   <>
//     <DropdownItem></DropdownItem>
//     <DropdownItem
//       key="delete"
//       className="text-danger"
//       onClick={handlerLogout}
//       color="danger"
//     >
//       Выйти
//     </DropdownItem>
//   </>
// ) : (
//   <DropdownItem>
//     <NavLink to={"/auth"} className={"text-2xl"}>
//       <Button>Войти</Button>
//     </NavLink>
//   </DropdownItem>
// )}