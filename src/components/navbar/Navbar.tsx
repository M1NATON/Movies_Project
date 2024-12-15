import NavbarMobile from "./NavbarMobile"
import NavbarDesktop from "./NavbarDesktop"

const Navbar = () => {

  return (
    <>
      {
        window.screen.width < 1000 ? (
          <NavbarMobile/>
        ) : (
          <NavbarDesktop/>
        )
      }
    </>
  )
}

export default Navbar
