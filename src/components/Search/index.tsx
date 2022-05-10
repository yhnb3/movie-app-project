import { ChangeEvent, useState, MouseEvent } from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'

import { movieListState, pageState, searchTotalState, keywordState } from 'state/searchResult'

import styles from './search.module.scss'
import { SearchIcon } from 'assets/svgs'

import { getMovieApi } from 'services/movie'

import SearchContainer from './SearchContainer'

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [keyword, setKeyword] = useRecoilState(keywordState)
  const setMovieList = useSetRecoilState(movieListState)
  const setPage = useSetRecoilState(pageState)
  const setSearcTotal = useSetRecoilState(searchTotalState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e
    const targetValue: string = currentTarget.value
    setSearchValue(targetValue)
  }

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault()
    setKeyword(searchValue)
    const apikey = process.env.REACT_APP_MOVIE_API_KEY
    try {
      getMovieApi({
        apikey,
        s: searchValue,
        page: 1,
      }).then((res) => {
        if (res.data.Response === 'False') {
          setMovieList([])
          setSearcTotal(0)
        } else {
          setMovieList(res.data.Search)
          setSearcTotal(Number(res.data.totalResults))
        }
      })
      setPage(2)
    } catch (error: any) {
      Error('404')
    }
  }

  return (
    <div className={styles.search}>
      <form className={styles.searchForm}>
        <input
          className={styles.searchInput}
          type='text'
          value={searchValue}
          onChange={handleInputChange}
          placeholder='Search keyword'
        />
        <div className={styles.searchBtn}>
          <button className={styles.searchIcon} type='submit' onClick={handleSubmit}>
            <SearchIcon />
          </button>
        </div>
      </form>
      <SearchContainer keyword={keyword} />
    </div>
  )
}

export default Search
