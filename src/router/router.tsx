import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import Movies from "../pages/Movies"
import MoviesSingle from "../pages/MoviesSingle"


export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <h1 className={'h-screen'}>auth</h1>
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
    ]
  }
])