import { createListenerMiddleware } from "@reduxjs/toolkit"
import { userApi } from "../app/services/userApi"

export const listenerMiddleware = createListenerMiddleware();


listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()
    if(action.payload.access_token) {
      localStorage.setItem('token', action.payload.access_token)
    }
  }
})