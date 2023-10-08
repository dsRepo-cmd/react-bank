import React from 'react'
import cl from './Header.module.css'

interface HeaderProps {
  title: string
  text?: string
}

const Header: React.FC<HeaderProps> = ({ title, text }) => {
  return (
    <div className={cl.header}>
      <h1 className={cl.title}>{title}</h1>
      <p className={cl.text}>{text}</p>
    </div>
  )
}

export default Header
