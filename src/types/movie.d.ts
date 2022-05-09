export interface IMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  isFav?: boolean
}

export interface IMovieAPIRes {
  Response: string
  Search: IMovie[]
  totalResults: string
}
