import styles from './Loading.module.scss'
import cx from 'classnames'

interface IProps {
  size?: number
}

const Loading = ({ size = 1 }: IProps) => {
  return (
    <svg className={styles.svgContainer} height={`${100 * size}`} width={`${100 * size}`} viewBox='0 0 100 100'>
      <circle className={cx(styles.loaderSvg, styles.bg)} cx={`${50 * size}`} cy={`${50 * size}`} r={`${45 * size}`} />
      <circle
        className={cx(styles.loaderSvg, styles.animate)}
        cx={`${50 * size}`}
        cy={`${50 * size}`}
        r={`${45 * size}`}
      />
    </svg>
  )
}

export default Loading
