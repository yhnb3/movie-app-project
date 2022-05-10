import { useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import styles from './search.module.scss'

import { movieListState, pageState, isFetchingState } from 'state/searchResult'
import { getMovieApi } from 'services/movie'

import MovieList from '../MovieList'
import NoResult from '../NoResult'

interface IProps {
  keyword: string
}

const SearchContainer = ({ keyword }: IProps) => {
  const [movieList, setMovieList] = useRecoilState(movieListState)
  const [page, setPage] = useRecoilState(pageState)
  const setIsFetching = useSetRecoilState(isFetchingState)

  const fetchData = useCallback(() => {
    const apikey = process.env.REACT_APP_MOVIE_API_KEY
    return getMovieApi({
      apikey,
      s: keyword,
      page,
    })
  }, [keyword, page])

  const addMovies = useCallback(() => {
    try {
      fetchData().then((res) => {
        setMovieList((prev) => prev.concat(res.data.Search))
      })
      setPage((prev) => prev + 1)
    } finally {
      setIsFetching(false)
    }
  }, [fetchData, setIsFetching, setMovieList, setPage])

  if (movieList.length === 0) {
    if (keyword === '') return <NoResult title='검색 결과가 없습니다.' />
    return (
      <div className={styles.searchContainer}>
        <p className={styles.searchTitle}>
          검색 키워드 : <span className={styles.searchKeyword}>{keyword}</span>
        </p>
        <NoResult title='검색 결과가 없습니다.' />
      </div>
    )
  }
  return (
    <div className={styles.searchContainer}>
      <p className={styles.searchTitle}>
        검색 키워드 : <span className={styles.searchKeyword}>{keyword}</span>
      </p>
      <MovieList movieList={movieList} addMovies={addMovies} />
    </div>
  )
}

export default SearchContainer
