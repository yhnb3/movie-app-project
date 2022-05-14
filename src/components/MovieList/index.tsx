import { memo, useRef, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useInView } from 'react-intersection-observer'
import { useMount } from 'hooks'
import cx from 'classnames'

import { IMovie } from 'types/movie.d'
import MovieItem from '../MovieItem'
import Loading from '../Loading'
import { pageState, searchTotalState } from 'state/searchResult'

import styles from './movieList.module.scss'

interface IProps {
  movieList: IMovie[]
}

const MovieList = ({ movieList }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const searchTotal = useRecoilValue(searchTotalState)
  const [page, setPage] = useRecoilState(pageState)

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

  return (
    <div className={styles.movieList} ref={containerRef}>
      <ul>
        {movieList.map((movie: IMovie, idx: number) => {
          const key = `movie-${movie.imdbID}-${idx}`
          return (
            <li key={key}>
              <MovieItem movie={movie} idx={idx} />
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
