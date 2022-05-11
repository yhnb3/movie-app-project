import { axios } from 'hooks/worker'
import { IMovieAPIRes } from 'types/movie'

const MOVIE_BASE_URL = 'https://omdbapi.com'

interface Params {
  apikey: string | undefined
  s: string
  page: number
}

export const getMovieApi = (params: Params) =>
  axios.get<IMovieAPIRes>(`${MOVIE_BASE_URL}`, {
    params,
  })
