import { useRecoilValue } from 'recoil'
import { favoriteState } from 'state/favoriteState'

import MovieList from 'components/MovieList'

const Favorite = () => {
  const favorites = useRecoilValue(favoriteState)
  console.log(favorites)
  return (
    <div>
      <h1>즐겨찾기</h1>
      <MovieList movies={favorites} />
    </div>
  )
}

export default Favorite
