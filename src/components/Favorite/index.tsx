import { useRecoilValue } from 'recoil'
import { favoriteState } from 'state/favoriteState'

import MovieItem from 'components/MovieList/MovieItem'
import { IMovie } from 'types/movie'

const Favorite = () => {
  const favorites = useRecoilValue(favoriteState)
  return (
    <div>
      <h1>즐겨찾기</h1>
      <div>
        <ul>
          {favorites.map((movie: IMovie) => (
            <li key={movie.imdbID}>
              <MovieItem movie={movie} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Favorite
