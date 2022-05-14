import { Routes, Route } from 'react-router-dom'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useMount } from 'react-use'
import store from 'store'

import styles from './Routes.module.scss'
import { favoriteState } from 'state/favoriteState'
import { modalState, modalSelectedMovieState } from 'state/portalState'
import { Search, Favorite } from 'components'
import GNB from './_shared/GNB'
import Modal from './_shared/Modal'

const App = () => {
  const setFavorites = useSetRecoilState(favoriteState)
  const isPortal = useRecoilValue(modalState)
  const selectedMovie = useRecoilValue(modalSelectedMovieState)

  useMount(() => {
    const favorites = store.get('favorites') || []
    setFavorites(favorites)
  })

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {isPortal ? <Modal movie={selectedMovie} /> : null}
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
