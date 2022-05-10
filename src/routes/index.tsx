import { Routes, Route } from 'react-router-dom'

import styles from './Routes.module.scss'

import { Search, Favorite } from 'components'
import GNB from './_shared/GNB'

const App = () => {
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
