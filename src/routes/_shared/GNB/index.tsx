import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import styles from './Gnb.module.scss'

const Footer = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to='/' className={({ isActive }) => cx(styles.navBtn, styles.left, { [styles.isActive]: isActive })}>
        검색
      </NavLink>
      <NavLink
        to='favorite'
        className={({ isActive }) => cx(styles.navBtn, styles.right, { [styles.isActive]: isActive })}
      >
        즐겨찾기
      </NavLink>
    </nav>
  )
}

export default Footer
