import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { DndContext, useSensor, useSensors, KeyboardSensor, MouseSensor, TouchSensor, DragOverlay } from '@dnd-kit/core'
import { sortableKeyboardCoordinates, SortableContext } from '@dnd-kit/sortable'
import { restrictToFirstScrollableAncestor, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import store from 'store'

import { favoriteState } from 'state/favoriteState'
import styles from './favorite.module.scss'
import NoResult from 'components/NoResult'
import { IMovie } from 'types/movie'
import MovieItem from '../MovieItem'
import SortableItem from './SortableItem'

const FavoriteContainer = () => {
  const [favorites, setFavorites] = useRecoilState(favoriteState)
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  )
  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }
  const handleDragEnd = ({ over, active }: { over: any; active: any }) => {
    const overIdx = Number(over.id)
    const activeIdx = Number(active.id)
    let newFavorites: IMovie[]
    setFavorites((prev) => {
      if (overIdx > activeIdx) {
        newFavorites = [
          ...prev.slice(0, activeIdx),
          ...prev.slice(activeIdx + 1, overIdx + 1),
          prev[activeIdx],
          ...prev.slice(overIdx + 1),
        ]
      } else {
        newFavorites = [
          ...prev.slice(0, overIdx),
          prev[activeIdx],
          ...prev.slice(overIdx, activeIdx),
          ...prev.slice(activeIdx + 1),
        ]
      }
      store.set('favorites', newFavorites)
      return newFavorites
    })
    setActiveId(null)
  }

  if (favorites.length === 0) return <NoResult title='즐겨찾기가 비었습니다.' />
  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      autoScroll={{ threshold: { x: 0, y: 0.05 } }}
    >
      <SortableContext
        items={favorites.map((_, idx: number) => {
          return { id: String(idx) }
        })}
      >
        <div className={styles.favoriteContainer}>
          <ul>
            {favorites.map((movie: IMovie, idx: number) => {
              return (
                <SortableItem id={String(idx)} key={movie.imdbID}>
                  <MovieItem movie={movie} idx={idx} />
                </SortableItem>
              )
            })}
          </ul>
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={null} wrapperElement='ul'>
        {activeId ? <MovieItem movie={favorites[activeId]} idx={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default FavoriteContainer
