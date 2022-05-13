import { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface IProps {
  children: ReactNode
  id: string
}
const SortableItem = ({ children, id }: IProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : undefined,
  }
  return (
    <li style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </li>
  )
}

export default SortableItem
