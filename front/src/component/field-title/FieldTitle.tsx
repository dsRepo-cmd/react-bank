import React, { FC } from 'react'
import cl from './FieldTitle.module.css'

interface FieldTitleProps {
  text: string
}

const FieldTitle: FC<FieldTitleProps> = ({ text }) => {
  return <h2 className={cl.title}>{text}</h2>
}

export default FieldTitle
