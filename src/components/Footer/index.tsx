import { Link } from 'react-router-dom'

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.tab}>
      <Link to='/'>
        <button type='button'>검색</button>
      </Link>
      <Link to='favorite'>
        <button type='button'>즐겨찾기</button>
      </Link>
    </footer>
  )
}

export default Footer
