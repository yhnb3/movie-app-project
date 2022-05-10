import styles from './noResult.module.scss'
import { Plus } from '../../assets/svgs'

interface IProps {
  title: string
}
const NoResult = ({ title }: IProps) => {
  return (
    <div className={styles.noResultContainer}>
      <p className={styles.noResultTitle}>{title}</p>
      <div className={styles.plusIcon}>
        <Plus />
      </div>
    </div>
  )
}

export default NoResult
