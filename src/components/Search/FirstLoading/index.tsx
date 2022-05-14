import Loading from 'components/Loading'
import styles from './firstLoading.module.scss'

const FirstLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Loading />
    </div>
  )
}

export default FirstLoading
