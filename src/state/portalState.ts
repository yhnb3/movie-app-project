import { atom } from 'recoil'

import { IMovie } from 'types/movie'

const INITAIL_MOVIE_STATE = {
  Title: '',
  Year: '',
  imdbID: '',
  Type: '',
  Poster: '',
}

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
})

export const modalSelectedMovieState = atom<IMovie>({
  key: 'modalSelectedMovieState',
  default: INITAIL_MOVIE_STATE,
})
