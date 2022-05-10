import { useRecoilState, useRecoilValue } from 'recoil'
import { favoriteState } from 'state/favoriteState'

import { IMovie } from '../../types/movie.d'
import styles from './MovieItem.module.scss'
import { HeartFillIcon, HeartEmptyIcon } from '../../assets/svgs'
import { movieListState } from 'state/searchResult'

interface IProps {
  movie: IMovie
  idx: number
}

const MovieItem = ({ movie, idx }: IProps) => {
  const [favorites, setFavorites] = useRecoilState(favoriteState)
  const movieList = useRecoilValue(movieListState)

  const movieIdx = movieList.findIndex(
    (prevMovie: IMovie, prevIdx: number) => prevMovie.imdbID === movie.imdbID && prevIdx < idx
  )
  const poster = movie.Poster === 'N/A' ? '/no_image.png' : movie.Poster
  const favMovieIndex = favorites.findIndex((favoriteMovie: IMovie) => favoriteMovie.imdbID === movie.imdbID)
  const isFav = movie.isFav ? movie.isFav : favMovieIndex !== -1

  const handleFavorite = () => {
    if (isFav) {
      setFavorites((prevList) => [...prevList.slice(0, favMovieIndex), ...prevList.slice(favMovieIndex + 1)])
    } else {
      setFavorites((prveList) => [...prveList, { ...movie, isFav: true }])
    }
  }

  if (movieIdx !== -1) return null
  return (
    <div className={styles.movieItem}>
      <img className={styles.poster} src={poster} alt={movie.Title} />
      <div className={styles.infoBox}>
        <p className={styles.title}>{movie.Title}</p>
        <p className={styles.year}>{movie.Year}</p>
        <p className={styles.type}>{movie.Type}</p>
      </div>
      <button type='button' onClick={handleFavorite} className={styles.iconBox}>
        {isFav ? <HeartFillIcon /> : <HeartEmptyIcon />}
      </button>
    </div>
  )
}

export default MovieItem
