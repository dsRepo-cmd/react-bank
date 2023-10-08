import React from 'react'
import cl from './BackLinkMenu.module.css'
import { useNavigate } from 'react-router-dom'

import backLink from './back-link.svg'
interface BackLinkMenuProps {
  children?: React.ReactNode
  title?: string
}
const BackLinkMenu: React.FC<BackLinkMenuProps> = ({
  title,
}) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className={cl.bar}>
      <img
        className={cl.img}
        src={backLink}
        alt="back-link"
        onClick={handleGoBack}
      />
      {title && <h2 className={cl.title}>{title}</h2>}
    </div>
  )
}

export default BackLinkMenu
