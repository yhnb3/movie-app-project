import { ChangeEvent, useState, MouseEvent, FormEvent, useCallback } from 'react'
import styles from './Search.module.scss'

import { getMovieApi } from 'services/movie'
import { IMovieAPIRes } from '../../types/movie.d'

import SearchContainer from './SearchContainer'

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [movieList, setMovieList] = useState<IMovieAPIRes>()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e
    const targetValue: string = currentTarget.value
    setSearchValue(targetValue)
  }

  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault()
    setKeyword(searchValue)
    const apikey = process.env.REACT_APP_MOVIE_API_KEY
    getMovieApi({
      apikey,
      s: searchValue,
      page: 1,
    }).then((res) => {
      console.log(res.data)
      setMovieList(res.data)
    })
  }

  const handleButtonClick = (e: MouseEvent) => {
    e.preventDefault()
    setKeyword(searchValue)
    const apikey = process.env.REACT_APP_MOVIE_API_KEY
    getMovieApi({
      apikey,
      s: searchValue,
      page: 1,
    }).then((res) => {
      console.log(res.data)
      setMovieList(res.data)
    })
  }

  const SearchResult = useCallback(() => {
    if (movieList?.Response === 'False' || !movieList) return <p>검색결과가 없습니다.</p>
    return <SearchContainer keyword={keyword} Search={movieList.Search} />
  }, [movieList, keyword])

  return (
    <div className={styles.search}>
      <h1>검색</h1>
      <form>
        <input type='text' value={searchValue} onChange={handleInputChange} onSubmit={handleInputSubmit} />
        <button type='submit' onClick={handleButtonClick}>
          검색
        </button>
      </form>
      <SearchResult />
    </div>
  )
}

export default Search
