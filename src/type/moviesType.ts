

export interface Movie {
  name: string
  id: number
  names: [{name: string}]
  type: string
  year: number
  description: string
  slogan: string
  movieLength: number
  ageRating: number
  genres: [{ name: string }]
  countries: [{ name: string }]
  rating: { kp: number; imdb: string }
  similarMovies: [
    {
      name: string
      poster: { url: string }
      id: number
    },
  ]
  logo: {
    url: string
  }
  poster: {
    url: string
  }
  persons: [{
    name: string
    id: number
    photo: string
    profession: string
  }]
}

export interface MoviesType {
  docs: Movie[]
  total: number,
  limit: number,
  page: number
  pages: number
}


