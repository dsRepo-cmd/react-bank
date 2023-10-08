import React from 'react'
import cl from './Button.module.css'
interface ButtonProps {
  children: React.ReactNode
  outline?: boolean
  danger?: boolean
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  outline = false,
  danger,
  onClick,
}) => {
  const buttonClass = [cl.button]

  danger
    ? buttonClass.push(cl.button__danger)
    : buttonClass.push('')

  outline
    ? buttonClass.push(cl.button__outline)
    : buttonClass.push(cl.button__fill)

  return (
    <button
      onClick={onClick}
      className={buttonClass.join(' ')}
    >
      {children}
    </button>
  )
}
