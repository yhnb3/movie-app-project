import { ReactNode } from 'react'

import reactDom from 'react-dom'

interface IProps {
  children: ReactNode
}

const Portal = ({ children }: IProps) => {
  const element: HTMLElement = document.getElementById('modal') as HTMLElement
  return reactDom.createPortal(children, element)
}

export default Portal
