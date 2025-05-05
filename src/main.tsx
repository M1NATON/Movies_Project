import React from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider } from "./context/ThemeProvider"
import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import { store } from "./app/store"
import { Provider } from "react-redux"
import StartParamHandler from "./components/StartParamHandler"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(

      <NextUIProvider>
        <ThemeProvider>
          <Provider store={store}>
            <RouterProvider router={router}/>
          </Provider>
        </ThemeProvider>
      </NextUIProvider>

  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
