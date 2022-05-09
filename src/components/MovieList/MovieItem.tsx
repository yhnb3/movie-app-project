import { useRecoilState } from 'recoil'
import { favoriteState } from 'state/favoriteState'

import { IMovie } from '../../types/movie.d'
import styles from './MovieList.module.scss'

import cx from 'classnames'

interface IProps {
  movie: IMovie
}

const MovieItem = ({ movie }: IProps) => {
  const [favorites, setFavorites] = useRecoilState(favoriteState)

  const favMovieIndex = favorites.findIndex((favoriteMovie: IMovie) => favoriteMovie.imdbID === movie.imdbID)
  const isFav = movie.isFav ? movie.isFav : favMovieIndex !== -1

  const handleFavorite = () => {
    if (isFav) {
      setFavorites((prevList) => [...prevList.slice(0, favMovieIndex), ...prevList.slice(favMovieIndex + 1)])
    } else {
      setFavorites((prveList) => [...prveList, { ...movie, isFav: true }])
    }
  }
  return (
    <div className={styles.movieItem}>
      <p>{movie.Title}</p>
      <button className={cx({ [styles.favorite]: isFav })} type='button' onClick={handleFavorite}>
        별
      </button>
    </div>
  )
}

export default MovieItem
