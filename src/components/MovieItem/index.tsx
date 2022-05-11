import { DragEvent, MouseEvent, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import cx from 'classnames'

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
  const [isDragging, setIsDragging] = useState(false)
  const [pos, setPos] = useState([0, 0])

  const movieIdx = movieList.findIndex(
    (prevMovie: IMovie, prevIdx: number) => prevMovie.imdbID === movie.imdbID && prevIdx < idx
  )
  const poster = movie.Poster === 'N/A' ? '/no_image.png' : movie.Poster
  const isFav = favorites.find((favoriteMovie: IMovie) => favoriteMovie.imdbID === movie.imdbID)

  const handleDragStart = (event: MouseEvent<HTMLButtonElement>) => {
    setPos([event.clientX, event.clientY])
    setIsDragging(true)
  }

  const handleDrag = (event: MouseEvent<HTMLButtonElement>) => {
    if (isDragging) {
      const moveX = `${event.clientX - pos[0]}px`
      const moveY = `${event.clientY - pos[1]}px`
      event.currentTarget.style.position = 'fixed'
      event.currentTarget.style.transform = `translate(${moveX}, ${moveY})`
      event.currentTarget.style.zIndex = '9999'
      event.currentTarget.style.transition = 'opacity 0.2s cubic-bezier(0.2, 0, 0, 1) 0s'
    }
  }

  const hadleDragEnd = (event: MouseEvent<HTMLButtonElement>) => {
    setIsDragging(false)
    event.currentTarget.removeAttribute('style')
  }

  if (movieIdx !== -1) return null
  return (
    <button
      type='button'
      // draggable='true'
      className={cx(styles.movieItem, { [styles.dragging]: isDragging })}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={hadleDragEnd}
    >
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
