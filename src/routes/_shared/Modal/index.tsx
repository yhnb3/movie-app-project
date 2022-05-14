import { IMovie } from 'types/movie'
import Portal from './Portal'
import Item from './Item'
import styles from './Modal.module.scss'

interface IProps {
  movie: IMovie
}
const Modal = ({ movie }: IProps) => {
  return (
    <Portal>
      <div className={styles.modal}>
        <div className={styles.modalWrapper}>
          <Item movie={movie} />
        </div>
      </div>
    </Portal>
  )
}
export default Modal
