import { useContext } from "react"
import { ThemeContext } from "../context/ThemeProvider"

export const textColorTheme = () => {
  const {theme} = useContext(ThemeContext);
  const color = `${theme === 'dark' ? 'text-white' : 'text-black'}`
  return color
}