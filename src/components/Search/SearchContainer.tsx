import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import styles from './Search.module.scss'

import { movieListState, pageState } from 'state/searchResult'
import { getMovieApi } from 'services/movie'

import MovieList from '../MovieList'

interface IProps {
  keyword: string
}

const SearchContainer = ({ keyword }: IProps) => {
  const [movieList, setMovieList] = useRecoilState(movieListState)
  const [page, setPage] = useRecoilState(pageState)

  const fetchData = useCallback(() => {
    const apikey = process.env.REACT_APP_MOVIE_API_KEY
    return getMovieApi({
      apikey,
      s: keyword,
      page,
    })
  }, [keyword, page])

  const addMovies = useCallback(() => {
    fetchData().then((res) => {
      setMovieList((prev) => prev.concat(res.data.Search))
    })
    setPage((prev) => prev + 1)
  }, [fetchData, setMovieList, setPage])

  if (movieList.length === 0) return <p>검색 결과가 없습니다.</p>
  return (
    <div className={styles.searchContainer}>
      <h1>{keyword}</h1>
      <MovieList movieList={movieList} addMovies={addMovies} />
    </div>
  )
}

export default SearchContainer
