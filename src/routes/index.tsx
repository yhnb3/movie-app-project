import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import styles from './Routes.module.scss'

import { Search, Favorite, Footer } from '../components'

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <RecoilRoot>
          <Router>
            <main>
              <Routes>
                <Route path='/' element={<Search />} />
                <Route path='favorite' element={<Favorite />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </RecoilRoot>
      </div>
    </div>
  )
}

export default App
