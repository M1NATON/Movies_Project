import React from "react"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../../app/slices/UserSlice"

const DropdownNavbar = () => {

  const auth = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlerLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }
  return (
    <>
      {auth ? (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Профиль</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">
              <NavLink to={"/profile"}>Личный кабинет</NavLink>
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              onClick={handlerLogout}
              color="danger"
            >
              Выйти
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <NavLink to={"/auth"} className={"text-2xl"}>
          <Button>Войти</Button>
        </NavLink>
      )}
    </>
  )
}

export default DropdownNavbar