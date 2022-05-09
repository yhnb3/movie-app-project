import styles from './Search.module.scss'

import { IMovie } from '../../types/movie.d'

import MovieList from '../MovieList'

interface IProps {
  keyword: string
  Search: IMovie[]
}

const SearchContainer = ({ keyword, Search }: IProps) => {
  return (
    <div>
      <h1>{keyword}</h1>
      <MovieList movies={Search} />
    </div>
  )
}

export default SearchContainer
