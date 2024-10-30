export interface receivedMovieStatus {
  id?: string
  user_id?: string
  movie_id?: number
  status: string
}

export interface MovieStatusType {
  receivedMovieStatus: receivedMovieStatus[]
  totalCount: number
}
