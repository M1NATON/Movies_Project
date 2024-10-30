import { api } from "./api"
import { User } from "../../type/userType"


export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<{access_token: string}, User>({
      query: userData => ({
        url: 'auth/login',
        method: "POST",
        body: userData
      })
    }),

    register: builder.mutation<{access_token: string}, User>({
      query: userData => ({
        url: 'auth/registration',
        method: "POST",
        body: userData
      })
    })

  })
})