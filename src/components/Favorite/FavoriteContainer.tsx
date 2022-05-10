import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import store from 'store'

import { favoriteState } from 'state/favoriteState'
import styles from './favorite.module.scss'
import NoResult from 'components/NoResult'
import { IMovie } from 'types/movie'
import MovieItem from '../MovieItem'

const FavoriteContainer = () => {
  const favorites = useRecoilValue(favoriteState)

  useEffect(() => {
    store.set('favorites', favorites)
  }, [favorites])

  if (favorites.length === 0) return <NoResult title='즐겨찾기가 비었습니다.' />
  return (
    <div className={styles.favoriteContainer}>
      <ul>
        {favorites.map((movie: IMovie, idx: number) => (
          <li key={movie.imdbID}>
            <MovieItem movie={movie} idx={idx} />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default FavoriteContainer
