import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import styles from './Routes.module.scss'

import { Search, Favorite, Footer } from '../components'

const App = () => {
  return (
    <div className={styles.app}>
      <RecoilRoot>
        <Router>
          <div className={styles.container}>
            <main>
              <Routes>
                <Route path='/' element={<Search />} />
                <Route path='favorite' element={<Favorite />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </RecoilRoot>
    </div>
  )
}

export default App
