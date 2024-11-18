import { api } from "./api"
import { MovieStatusType, receivedMovieStatus } from "../../type/movieStatusType"


export const movieStatusApi = api.injectEndpoints({
  endpoints: build => ({
    setStatus: build.mutation<
      receivedMovieStatus,
      { status: string,user_id: string, movie_id: number }
    >({
      query: status => ({
        url: "movie-status",
        method: "POST",
        body: status,
      }),
    }),

    getStatus: build.query<MovieStatusType, void>({
      query: () => ({
        url: "movie-status",
        method: "GET",
      }),
    }),

    patchStatus: build.mutation<
      receivedMovieStatus,
      { status: { status: string }; id: string }
    >({
      query: ({ status, id }) => ({
        url: `movie-status/${id}`,
        method: "PATCH",
        body: status,
      }),
    }),

    deleteStatus: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `movie-status/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})