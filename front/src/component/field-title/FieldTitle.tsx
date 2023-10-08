import React, { FC } from 'react'
import cl from './FieldTitle.module.css'

interface FieldTitleProps {
    text:string
}

const FieldTitle :FC <FieldTitleProps> = ({text}) => {
  return (
    <div className={cl.title}>{text}</div>
  )
}

export default FieldTitle