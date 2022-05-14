import { memo } from 'react'
import { useRecoilValue } from 'recoil'

import { isLoadingState, movieListState } from 'state/searchResult'

import MovieList from '../MovieList'
import NoResult from '../NoResult'
import FirstLoading from './FirstLoading'

import styles from './search.module.scss'

interface IProps {
  keyword: string
}

const SearchContainer = ({ keyword }: IProps) => {
  const movieList = useRecoilValue(movieListState)
  const isLoading = useRecoilValue(isLoadingState)

  if (movieList.length === 0) {
    if (isLoading) return <FirstLoading />
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
      <MovieList movieList={movieList} />
    </div>
  )
}

export default memo(SearchContainer)
