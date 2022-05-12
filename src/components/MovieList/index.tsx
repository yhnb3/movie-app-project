import { memo, useRef, useEffect, MouseEvent } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useInView } from 'react-intersection-observer'
import { useMount } from 'hooks'
import cx from 'classnames'

import styles from './movieList.module.scss'
import { IMovie } from 'types/movie.d'
import MovieItem from '../MovieItem'
import Loading from '../Loading'
import { pageState, searchTotalState } from 'state/searchResult'
import { modalState, modalSelectedMovieState } from 'state/portalState'

interface IProps {
  movieList: IMovie[]
}

const MovieList = ({ movieList }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const searchTotal = useRecoilValue(searchTotalState)
  const [page, setPage] = useRecoilState(pageState)
  const setModal = useSetRecoilState(modalState)
  const setSelectedMovie = useSetRecoilState(modalSelectedMovieState)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useMount(() => {
    const el = containerRef.current
    if (el) {
      if (movieList.length <= 10 && page <= 2) el.scrollTop = 0
    }
  })

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1)
    }
  }, [inView, setPage])

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const targetIdx = Number(event.currentTarget.dataset.idx)
    setModal(true)
    setSelectedMovie(movieList[targetIdx])
  }

  return (
    <div className={styles.movieList} ref={containerRef}>
      <ul>
        {movieList.map((movie: IMovie, idx: number) => {
          const key = `movie-${movie.imdbID}-${idx}`
          return (
            <li key={key}>
              <button type='button' onClick={handleClick} data-idx={idx}>
                <MovieItem movie={movie} idx={idx} />
              </button>
            </li>
          )
        })}
      </ul>
      <div className={styles.loading}>
        <div ref={ref} className={cx(styles.svgLoader, { [styles.hide]: movieList.length === searchTotal })}>
          <Loading size={0.5} />
        </div>
      </div>
    </div>
  )
}

export default memo(MovieList)
