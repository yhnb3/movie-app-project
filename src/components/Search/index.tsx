import { ChangeEvent, useState, MouseEvent } from 'react'
import { useSetRecoilState } from 'recoil'

import { movieListState, pageState } from 'state/searchResult'

import styles from './Search.module.scss'

import { getMovieApi } from 'services/movie'

import SearchContainer from './SearchContainer'

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const setMovieList = useSetRecoilState(movieListState)
  const setPage = useSetRecoilState(pageState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e
    const targetValue: string = currentTarget.value
    setSearchValue(targetValue)
  }

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault()
    setKeyword(searchValue)
    const apikey = process.env.REACT_APP_MOVIE_API_KEY
    getMovieApi({
      apikey,
      s: searchValue,
      page: 1,
    }).then((res) => {
      setMovieList(res.data.Search)
    })
    setPage(2)
  }

  return (
    <div className={styles.search}>
      <h1>검색</h1>
      <form>
        <input type='text' value={searchValue} onChange={handleInputChange} />
        <button type='submit' onClick={handleSubmit}>
          검색
        </button>
      </form>
      <SearchContainer keyword={keyword} />
    </div>
  )
}

export default Search
