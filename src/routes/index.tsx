import { Routes, Route } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { useMount } from 'react-use'
import store from 'store'

import styles from './Routes.module.scss'

import { favoriteState } from 'state/favoriteState'
import { Search, Favorite } from 'components'
import GNB from './_shared/GNB'

const App = () => {
  const setFavorites = useSetRecoilState(favoriteState)

  useMount(() => {
    const favorites = store.get('favorites') || []
    setFavorites(favorites)
  })

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <main>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='favorite' element={<Favorite />} />
          </Routes>
        </main>
        <footer>
          <GNB />
        </footer>
      </div>
    </div>
  )
}

export default App
