import { useRecoilValue, useSetRecoilState } from 'recoil'

import { modalState, modalSelectedMovieState } from 'state/portalState'
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
  const setModal = useSetRecoilState(modalState)
  const setSelectedMovie = useSetRecoilState(modalSelectedMovieState)

  const movieIdx = movieList.findIndex(
    (prevMovie: IMovie, prevIdx: number) => prevMovie.imdbID === movie.imdbID && prevIdx < idx
  )
  const poster = movie.Poster === 'N/A' ? '/no_image.png' : movie.Poster
  const isFav = favorites.find((favoriteMovie: IMovie) => favoriteMovie.imdbID === movie.imdbID)

  const handleModalOpen = () => {
    setModal(true)
    setSelectedMovie(movie)
  }

  if (movieIdx !== -1) return null
  return (
    <button type='button' className={styles.movieItem} onClick={handleModalOpen}>
      <img className={styles.poster} src={poster} alt={movie.Title} />
      <div className={styles.infoBox}>
        <p className={styles.title}>{movie.Title}</p>
        <p className={styles.year}>{movie.Year}</p>
        <p className={styles.type}>{movie.Type}</p>
      </div>
      <div className={styles.iconBox}>{isFav ? <HeartFillIcon /> : <HeartEmptyIcon />}</div>
    </button>
  )
}

export default MovieItem
