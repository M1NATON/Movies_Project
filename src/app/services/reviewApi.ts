import { api } from "./api"
import { ReviewType } from "../../type/reviewType"

export const reviewApi = api.injectEndpoints({
  endpoints: build => ({


    createReviews: build.mutation<ReviewType, ReviewType>({
      query: data => ({
        url: "review",
        method: "POST",
        body: data,
      }),
    }),

    

  }),
})
