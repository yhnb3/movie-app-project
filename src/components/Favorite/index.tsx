import styles from './favorite.module.scss'
import FavoriteContainer from './FavoriteContainer'

const Favorite = () => {
  return (
    <div>
      <p className={styles.favoriteTitle}>내 즐겨찾기</p>
      <FavoriteContainer />
    </div>
  )
}

export default Favorite
