import { IMovie } from '../../types/movie.d'
import MovieItem from './MovieItem'

interface IProps {
  movies: IMovie[]
}

const MovieList = ({ movies }: IProps) => {
  return (
    <div>
      <ul>
        {movies.map((movie: IMovie) => (
          <li key={movie.imdbID}>
            <MovieItem movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList
