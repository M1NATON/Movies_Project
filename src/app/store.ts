import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { api } from "./services/api"
import { moviesApi } from "./services/moviesApi"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,

  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(api.middleware, moviesApi.middleware)
    // .prepend(listenerMiddleware.middleware)
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
