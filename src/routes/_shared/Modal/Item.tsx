import { useRecoilState, useSetRecoilState } from 'recoil'
import { useRef } from 'react'
import { useClickAway } from 'hooks'
import store from 'store'

import styles from './modal.module.scss'
import { favoriteState } from 'state/favoriteState'
import { modalState } from 'state/portalState'
import { IMovie } from 'types/movie'
import { HeartFillIcon, HeartEmptyIcon, Plus } from 'assets/svgs'

interface IProps {
  movie: IMovie
}

const Item = ({ movie }: IProps) => {
  const itemRef = useRef(null)

  const [favorites, setFavorites] = useRecoilState(favoriteState)
  const setModal = useSetRecoilState(modalState)

  const poster = movie.Poster === 'N/A' ? '/no_image.png' : movie.Poster
  const isFav = favorites.find((favoriteMovie: IMovie) => favoriteMovie.imdbID === movie.imdbID)
  const handleFavorite = () => {
    if (isFav) {
      setFavorites((prevList) => {
        const nextList = prevList.filter((prevMovie) => movie.imdbID !== prevMovie.imdbID)
        store.set('favorites', nextList)
        return nextList
      })
      setModal(false)
    } else {
      setFavorites((prveList) => {
        const nextList = [...prveList, { ...movie, isFav: true }]
        store.set('favorites', nextList)
        return nextList
      })
    }
  }

  const handleExitClick = () => {
    setModal(false)
  }

  useClickAway(itemRef, () => {
    setModal(false)
  })

  return (
    <div className={styles.modalItem} ref={itemRef}>
      <img className={styles.poster} src={poster} alt={movie.Title} />
      <div className={styles.content}>
        <div className={styles.infoBox}>
          <p className={styles.title}>{movie.Title}</p>
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.favoriteBtn} type='button' onClick={handleFavorite}>
            {isFav ? <HeartFillIcon /> : <HeartEmptyIcon />}
          </button>
          <button className={styles.exitBtn} type='button' onClick={handleExitClick}>
            <Plus className={styles.plusIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item
