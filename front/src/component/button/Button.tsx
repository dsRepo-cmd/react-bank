import React from 'react'
import cl from './Button.module.css'
interface ButtonProps {
  children: React.ReactNode
  outline?: boolean
  danger?: boolean
  small?: boolean
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  outline = false,
  danger,
  onClick,
  small,
}) => {
  const buttonClass = [cl.button]

  small ? buttonClass.push(cl.small) : buttonClass.push('')

  danger
    ? buttonClass.push(cl.danger)
    : buttonClass.push('')

  outline
    ? buttonClass.push(cl.outline)
    : buttonClass.push(cl.fill)

  return (
    <button
      onClick={onClick}
      className={buttonClass.join(' ')}
    >
      {children}
    </button>
  )
}
