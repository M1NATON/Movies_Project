import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { Movie, MoviesType } from "../../type/moviesType"

const apiKinopoisk = "SPB2J1Z-BF04PFK-GDQKQYK-CF321SD"

//40K1TB2-NY0MFEJ-JHS83AY-AK27YYB
//29Q43VM-YPMM0AP-PAXZ3RM-GNYZM8X
//SPB2J1Z-BF04PFK-GDQKQYK-CF321SD

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.kinopoisk.dev" }),
  endpoints: builder => ({
    allMovies: builder.query<MoviesType, number>({
      query: (page: number) => ({
        url: `/v1.4/movie?page=${page}&limit=12&notNullFields=name&notNullFields=poster.url`,
        method: "GET",
        headers: {
          "X-API-KEY": apiKinopoisk,
        },
      }),
    }),

    allGenres: builder.query<[{ name: string; slug: string }], void>({
      query: () => ({
        url: "/v1/movie/possible-values-by-field?field=genres.name",
        headers: {
          "X-API-KEY": apiKinopoisk,
        },
      }),
    }),

    allTypes: builder.query<[{ name: string; slug: string }], void>({
      query: () => ({
        url: "/v1/movie/possible-values-by-field?field=type",
        headers: {
          "X-API-KEY": apiKinopoisk,
        },
      }),
    }),

    allCountry: builder.query<[{ name: string; slug: string }], void>({
      query: () => ({
        url: "/v1/movie/possible-values-by-field?field=countries.name",
        headers: {
          "X-API-KEY": apiKinopoisk,
        },
      }),
    }),

    filterMovies: builder.query<
      MoviesType,
      {
        lists?: string
        year?: number[]
        movie?: string
        type?: string[]
        page: number
        genres?: string[]
        countries?: string[]
        limit?: string
      }
    >({
      query: ({limit, year, page, genres, countries, movie, type, lists }) => {
        const params: URLSearchParams = new URLSearchParams({
          page: `${page}`,
          limit: limit || '12',
          selectFields: "",
          notNullFields: "name",
          sortField: lists ? 'top250' : "rating.kp",
          sortType: lists ? '1' : '-1',
          query: movie || "",
        })

        if (year && year.length > 0) {
          year.forEach(y => params.append("year", y.toString()))
        }

        if (type && type.length > 0) {
          type.forEach(y => params.append("type", y.toString()))
        }

        if(lists) {
          params.append('notNullFields', 'top250')
        }
        if(lists) {
          params.append('lists', lists)
        }

        if (genres && genres.length > 0) {
          genres.forEach(genre => params.append("genres.name", genre))
        }

        if (countries && countries.length > 0) {
          countries.forEach(country => params.append("countries.name", country))
        }

        return {
          url: `/v1.4/movie${movie && "/search"}?${params.toString()}&notNullFields=poster.url`,
          headers: {
            "X-API-KEY": apiKinopoisk,
          },
        }
      },
    }),

    myMovies: builder.query<MoviesType, { id?: number[]; page: number }>({
      query: ({ id, page }) => {
        const params: URLSearchParams = new URLSearchParams({
          page: `${page}`,
          limit: "12",
          selectFields: "",
          notNullFields: "name",
          sortField: "rating.kp",
          sortType: "-1",
          type: "",
        })

        if (id && id.length > 0) {
          id.forEach(y => params.append("id", y.toString()))
        }
        return {
          url: `/v1.4/movie?${params.toString()}&notNullFields=poster.url`,
          headers: {
            "X-API-KEY": apiKinopoisk,
          },
        }
      },
    }),

    getByIdMovie: builder.query<Movie, number>({
      query: id => ({
        url: `/v1.4/movie/${id}`,
        headers: {
          "X-API-KEY": apiKinopoisk,
        },
      }),
    }),

    randomMovie: builder.query<Movie, void>({
      query: () => ({
        url: "/v1.4/movie/random?notNullFields=poster.url",
        method: "GET",
        headers: {
          "X-API-KEY": apiKinopoisk,
        },
      }),
    }),
  }),
})
