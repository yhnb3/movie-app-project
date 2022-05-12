import { MouseEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import store from 'store'

import { favoriteState } from 'state/favoriteState'
import styles from './favorite.module.scss'
import NoResult from 'components/NoResult'
import { IMovie } from 'types/movie'
import MovieItem from '../MovieItem'

const FavoriteContainer = () => {
  const [favorites, setFavorites] = useRecoilState(favoriteState)
  const [isDragging, setIsDragging] = useState(false)
  const [originalPos, setOriginalPos] = useState([0, 0])
  const [pos, setPos] = useState([0, 0])
  const [selected, setSelected] = useState(0)

  const reorder = (idx: number) => {
    const target = idx
    if (selected === target) return
    setFavorites((prev) => {
      let nextFavorites: IMovie[] = []
      if (selected < target) {
        nextFavorites = [
          ...prev.slice(0, selected),
          ...prev.slice(selected + 1, target + 1),
          prev[selected],
          ...prev.slice(target + 1),
        ]
      } else {
        nextFavorites = [
          ...prev.slice(0, target),
          prev[selected],
          ...prev.slice(target, selected),
          ...prev.slice(selected + 1),
        ]
      }
      store.set('favorites', nextFavorites)
      return nextFavorites
    })
  }

  const handleDragStart = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.position = 'fixed'
    setOriginalPos([event.clientX, event.clientY])
    setPos([event.clientX, event.clientY])
    setIsDragging(true)
    setSelected(Number(event.currentTarget.dataset.id))
  }

  const handleDrag = (event: MouseEvent<HTMLElement>) => {
    if (isDragging) {
      const moveX = `${event.clientX - originalPos[0]}px`
      const moveY = `${event.clientY - originalPos[1]}px`
      event.currentTarget.style.transform = `translate(${moveX}, ${moveY})`
      event.currentTarget.style.zIndex = '9999'
      event.currentTarget.style.transition = 'opacity 0.2s cubic-bezier(0.2, 0, 0, 1) 0s'
      setPos([event.clientX, event.clientY])
    }
  }

  const handleDragEnd = (event: MouseEvent<HTMLElement>) => {
    setIsDragging(false)
    const targetIdx = Math.ceil((pos[1] - 90 + 1) / 114) - 1
    reorder(targetIdx)
    event.currentTarget.removeAttribute('style')
  }

  if (favorites.length === 0) return <NoResult title='즐겨찾기가 비었습니다.' />
  return (
    <div className={styles.favoriteContainer}>
      <ul>
        {favorites.map((movie: IMovie, idx: number) => {
          const targetTop = 90 + idx * 114
          const targetBottom = 90 + (idx + 1) * 114
          const moveDown = 'translate(0, 104px)'
          let dragStyle = ''
          if (selected !== idx && isDragging) {
            if (selected < idx && targetTop > pos[1]) dragStyle = moveDown
            if (selected > idx && targetBottom > pos[1]) dragStyle = moveDown
          }
          return (
            <li key={movie.imdbID}>
              <button
                type='button'
                data-id={idx}
                onMouseDown={handleDragStart}
                onMouseMove={handleDrag}
                onMouseUp={handleDragEnd}
                className={styles.favoriteMovie}
                style={{ transform: `${dragStyle}` }}
              >
                <MovieItem movie={movie} idx={idx} />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default FavoriteContainer
