import { atom } from 'recoil'
import { IMovie } from '../types/movie.d'

export const movieListState = atom<IMovie[]>({
  key: 'movieListState',
  default: [],
})

export const pageState = atom<number>({
  key: 'pageState',
  default: 1,
})
