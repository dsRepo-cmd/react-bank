import React, { FC } from 'react'
import cl from './Grid.module.css'

interface GridProps {
  children?: React.ReactNode
  small?: boolean
}

const Grid: FC<GridProps> = ({ children, small }) => {
  const gridClasses = `${cl.grid} ${
    small ? cl.grid__small : ''
  }`

  return <div className={gridClasses}>{children}</div>
}

export default Grid
