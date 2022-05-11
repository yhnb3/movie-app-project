import { useRecoilValue } from 'recoil'

import styles from './search.module.scss'

import { movieListState } from 'state/searchResult'

import MovieList from '../MovieList'
import NoResult from '../NoResult'

interface IProps {
  keyword: string
}

const SearchContainer = ({ keyword }: IProps) => {
  const movieList = useRecoilValue(movieListState)

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
      <MovieList movieList={movieList} />
    </div>
  )
}

export default SearchContainer
