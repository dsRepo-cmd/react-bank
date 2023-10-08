import React from 'react'
import { Link } from 'react-router-dom'
import cl from './Prefix.module.css'
interface PrefixProps {
  text: string
  link: string
  linkText: string
}
const Prefix: React.FC<PrefixProps> = ({
  text,
  linkText,
  link,
}) => {
  return (
    <div className={cl.prefix}>
      {text}{' '}
      <Link className={cl.prefix__link} to={link}>
        {linkText}
      </Link>
    </div>
  )
}

export default Prefix
