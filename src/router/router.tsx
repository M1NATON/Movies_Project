import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import Movies from "../pages/Movies"
import MoviesSingle from "../pages/MoviesSingle"
import Profile from "../pages/Profile"
import Auth from "../pages/Auth"


export const router = createBrowserRouter([
  {
    path: 'auth',
    element: <Auth/>
  },
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: 'movies/:page?',
        element: <Movies/>
      },
      {
        path: 'movie/:id?',
        element: <MoviesSingle/>
      },
      {
        path: 'profile',
        element: <Profile/>
      },
    ]
  }
])