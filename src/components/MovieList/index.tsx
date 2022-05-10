import { UIEvent, memo, useRef, useEffect } from 'react'

import styles from './MovieList.module.scss'

import cx from 'classnames'

import { IMovie } from '../../types/movie.d'
import MovieItem from '../MovieItem'
import Loading from '../Loading'

import { isFetchingState, pageState, searchTotalState } from '../../state/searchResult'
import { useRecoilState, useRecoilValue } from 'recoil'

interface IProps {
  movieList: IMovie[]
  addMovies: () => void
}

const MovieList = ({ movieList, addMovies }: IProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isFetching, setIsFetching] = useRecoilState(isFetchingState)
  const searchTotal = useRecoilValue(searchTotalState)
  const page = useRecoilValue(pageState)

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (searchTotal === movieList.length) return
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    if (clientHeight + scrollTop >= scrollHeight) {
      if (!isFetching) {
        setIsFetching(true)
        addMovies()
      }
    }
  }

  useEffect(() => {
    const el = ref.current
    if (el) {
      if (movieList.length <= 10 && page <= 2) el.scrollTop = 0
    }
  })

  return (
    <div className={styles.movieList} onScroll={handleScroll} ref={ref}>
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
        <div className={cx(styles.svgLoader, { [styles.hide]: movieList.length === searchTotal })}>
          <Loading size={0.5} />
        </div>
      </div>
    </div>
  )
}

export default memo(MovieList)
