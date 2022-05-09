import styles from './Routes.module.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Search, Favorite, Footer } from '../components'

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Router>
          <main>
            <Routes>
              <Route path='/' element={<Search />} />
              <Route path='favorite' element={<Favorite />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </div>
  )
}

export default App
