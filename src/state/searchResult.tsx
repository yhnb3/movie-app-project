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

export const isFetchingState = atom<boolean>({
  key: 'isFetchingState',
  default: false,
})

export const searchTotalState = atom<number>({
  key: 'searchTotalState',
  default: 0,
})

export const keywordState = atom<string>({
  key: 'keywordState',
  default: '',
})
