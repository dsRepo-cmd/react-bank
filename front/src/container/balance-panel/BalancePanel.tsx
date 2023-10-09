import React from 'react'
import cl from './BalancePanel.module.css'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../../component/status-bar/StatusBar'

interface BalancePanelProps {
  balance: number
}

const BalancePanel: React.FC<BalancePanelProps> = ({
  balance,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <div className={cl.back}>
        <StatusBar />

        <div className={cl.header}>
          <div
            onClick={() => navigate('/settings')}
            className={cl.settings}
          ></div>
          <p className={cl.title}>Main wallet</p>
          <div
            onClick={() => navigate('/notifications')}
            className={cl.notifications}
          ></div>
        </div>

        <h1 className={cl.balance}>
          $ {balance.toFixed(2)}
        </h1>

        <div className={cl.buttons}>
          <div
            onClick={() => navigate('/recive')}
            className={cl.recive}
          ></div>
          <div
            onClick={() => navigate('/send')}
            className={cl.send}
          ></div>
          <span className={cl.buttons__text}>Receive</span>
          <span className={cl.buttons__text}>Send</span>
        </div>
      </div>
    </>
  )
}

export default BalancePanel
