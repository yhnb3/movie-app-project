import { useRecoilValue } from 'recoil'
import cx from 'classnames'

import { favoriteState } from 'state/favoriteState'
import { IMovie } from 'types/movie.d'
import styles from './movieItem.module.scss'
import { HeartFillIcon, HeartEmptyIcon } from 'assets/svgs'
import { movieListState } from 'state/searchResult'

interface IProps {
  movie: IMovie
  idx: number
}

const MovieItem = ({ movie, idx }: IProps) => {
  const favorites = useRecoilValue(favoriteState)
  const movieList = useRecoilValue(movieListState)

  const movieIdx = movieList.findIndex(
    (prevMovie: IMovie, prevIdx: number) => prevMovie.imdbID === movie.imdbID && prevIdx < idx
  )
  const poster = movie.Poster === 'N/A' ? '/no_image.png' : movie.Poster
  const isFav = favorites.find((favoriteMovie: IMovie) => favoriteMovie.imdbID === movie.imdbID)

  if (movieIdx !== -1) return null
  return (
    <div className={cx(styles.movieItem)}>
      <img className={styles.poster} src={poster} alt={movie.Title} />
      <div className={styles.infoBox}>
        <p className={styles.title}>{movie.Title}</p>
        <p className={styles.year}>{movie.Year}</p>
        <p className={styles.type}>{movie.Type}</p>
      </div>
      <div className={styles.iconBox}>{isFav ? <HeartFillIcon /> : <HeartEmptyIcon />}</div>
    </div>
  )
}

export default MovieItem
