import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Layout = () => {
  return (
    <div className={"flex min-h-[100vh] flex-col text-foreground"}>

      <Navbar/>

      <div className=" flex-grow container mx-auto mt-20">
        <Outlet />
      </div>
      <footer>footer</footer>
    </div>
  )
}

export default Layout
