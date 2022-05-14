import { ChangeEvent, useState, MouseEvent, useCallback, useEffect } from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'

import { movieListState, pageState, searchTotalState, keywordState, isLoadingState } from 'state/searchResult'

import { SearchIcon } from 'assets/svgs'

import { getMovieApi } from 'services/movie'

import SearchContainer from './SearchContainer'

import styles from './search.module.scss'

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const setIsLoading = useSetRecoilState(isLoadingState)
  const [keyword, setKeyword] = useRecoilState(keywordState)
  const setMovieList = useSetRecoilState(movieListState)
  const [page, setPage] = useRecoilState(pageState)
  const setSearcTotal = useSetRecoilState(searchTotalState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e
    const targetValue: string = currentTarget.value
    setSearchValue(targetValue)
  }

  const fetchData = useCallback(() => {
    const apikey = process.env.REACT_APP_MOVIE_API_KEY
    return getMovieApi({
      apikey,
      s: keyword,
      page,
    })
  }, [keyword, page])

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault()
    if (keyword === searchValue) return
    setKeyword(searchValue)
    setMovieList([])
    setPage(1)
    setIsLoading(true)
  }
  useEffect(() => {
    if (page === 0) return
    try {
      fetchData().then((res) => {
        if (res.data.Response === 'False') {
          setMovieList([])
          setSearcTotal(0)
        } else {
          setMovieList((prev) => {
            if (page <= Math.ceil(prev.length / 10)) {
              return prev
            }
            return [...prev, ...res.data.Search]
          })
          setSearcTotal(Number(res.data.totalResults))
        }
        setIsLoading(false)
      })
    } catch (error: any) {
      setPage(1)
      Error('404')
      setIsLoading(false)
    }
  }, [fetchData, page, setIsLoading, setMovieList, setPage, setSearcTotal])

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
