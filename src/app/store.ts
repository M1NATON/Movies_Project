import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { api } from "./services/api"
import { moviesApi } from "./services/moviesApi"
import user from './slices/UserSlice'
import { listenerMiddleware } from "../features/middleware"
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    user
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(api.middleware, moviesApi.middleware)
    .prepend(listenerMiddleware.middleware)
  },
})

export type AppStore = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = AppStore["dispatch"]

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
