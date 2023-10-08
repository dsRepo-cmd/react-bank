import React from 'react'
import cl from './StatusBar.module.css'

const StatusBar: React.FC = () => {
  return (
    <>
      <div className={cl.status__container}>
        <span className={cl.status__time}></span>
        <span className={cl.status__icons}></span>
      </div>
    </>
  )
}

export default StatusBar
