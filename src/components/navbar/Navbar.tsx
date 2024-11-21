import NavbarMobile from "./NavbarMobile"
import NavbarDecstop from "./NavbarDecstop"

const Navbar = () => {

  return (
    <>
      {
        window.screen.width < 1000 ? (
          <NavbarMobile/>
        ) : (
          <NavbarDecstop/>
        )
      }
    </>
  )
}

export default Navbar
