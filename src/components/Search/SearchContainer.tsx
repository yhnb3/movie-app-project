import styles from './Search.module.scss'
import { IMovie } from '../../types/movie.d'

interface IProps {
  keyword: string
  Search: IMovie[]
}

const SearchContainer = ({ keyword, Search }: IProps) => {
  return (
    <div>
      <h1>{keyword}</h1>
      <ul className={styles.listContainer}>
        {Search.map((movie: IMovie) => (
          <li key={movie.imdbID}>
            <p>{movie.Title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchContainer
