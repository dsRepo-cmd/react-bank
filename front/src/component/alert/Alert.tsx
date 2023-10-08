import React from 'react'
import danger from './danger.svg'
import successPic from './success.svg'

import cl from './Alert.module.css'
interface AlertProps {
  text?: string
  success?: boolean
}

const Alert: React.FC<AlertProps> = ({ text, success }) => {
  const alertClass = success
    ? `${cl.alert} ${cl.success}`
    : cl.alert

  const textClass = success ? cl.text__success : cl.text

  const srcImg = success ? successPic : danger

  return (
    <>
      {text && (
        <div className={alertClass}>
          <img src={srcImg} alt="alert" />

          <span className={textClass}>{text}</span>
        </div>
      )}
    </>
  )
}

export default Alert
