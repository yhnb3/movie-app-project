import { atom } from 'recoil'
import { IMovie } from '../types/movie.d'

export const favoriteState = atom<IMovie[]>({
  key: 'favoriteState',
  default: [],
})
