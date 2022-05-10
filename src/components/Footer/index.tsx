import { useState, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { cx } from 'styles'

import styles from './Footer.module.scss'

const Footer = () => {
  const [isTab, setIsTab] = useState<string | undefined>('search')
  const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget.dataset
    if (name === 'search') {
      navigate('/')
    } else {
      navigate('/favorite')
    }
    setIsTab(name)
  }

  return (
    <footer className={styles.tab}>
      <button
        data-name='search'
        onClick={handleClick}
        className={cx(styles.tabBtn, styles.left, { [styles.selected]: isTab === 'search' })}
        type='button'
      >
        검색
      </button>
      <button
        data-name='favorite'
        onClick={handleClick}
        className={cx(styles.tabBtn, styles.right, { [styles.selected]: isTab === 'favorite' })}
        type='button'
      >
        즐겨찾기
      </button>
    </footer>
  )
}

export default Footer
