import { UIEvent, memo } from 'react'

import styles from './MovieList.module.scss'

import { IMovie } from '../../types/movie.d'
import MovieItem from './MovieItem'

interface IProps {
  movieList: IMovie[]
  addMovies: () => void
}

const MovieList = ({ movieList, addMovies }: IProps) => {
  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    if (clientHeight + scrollTop === scrollHeight) {
      addMovies()
    }
  }
  return (
    <div className={styles.movieList} onScroll={handleScroll}>
      <ul>
        {movieList.map((movie: IMovie) => (
          <li key={movie.imdbID}>
            <MovieItem movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(MovieList)
