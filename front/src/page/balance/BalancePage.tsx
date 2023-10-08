import React, { useState, useEffect } from 'react'
import Page from '../../component/page/Page'

import cl from './BalancePage.module.css'
import Grid from '../../component/grid/Grid'
import StatusBar from '../../component/status-bar/StatusBar'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import {
  FIELD_NAME,
  ResData,
  SERVER_IP,
  Transaction,
} from '../../util/consts'

import BalanceList from '../../container/balance-list/BalanceList'

const BalancePage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0)

  const [transactions, setTransactions] = useState<
    Transaction[]
  >([])

  const auth = React.useContext(AuthContext)

  const navigate = useNavigate()

  // Get Data=============================================

  const fetchBalanceData = async () => {
    try {
      const res = await fetch(
        `http://${SERVER_IP}/balance`,

        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: convertData(),
        },
      )

      const data: ResData = await res.json()

      if (res.ok) {
        setBalance(data.session.balance)

        if (data.session.transactions !== null) {
          setTransactions(data.session.transactions)
        }
      }
    } catch (error: any) {
      console.error('Error fetching data:', error)
    }
  }

  const convertData = () => {
    return JSON.stringify({
      [FIELD_NAME.USER_ID]: auth?.state.user?.id,
    })
  }

  useEffect(() => {
    fetchBalanceData()
  }, [])

  // =======================================================================

  return (
    <Page>
      <div className={cl.back}>
        <StatusBar />

        <div className={cl.header}>
          <div
            onClick={() => navigate('/settings')}
            className={cl.settings}
          ></div>
          <div className={cl.title}>Main wallet</div>
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
          <div className={cl.buttons__text}>Receive</div>
          <div className={cl.buttons__text}>Send</div>
        </div>
      </div>

      <Grid>
        <BalanceList
          onTransactionClick={(id) =>
            navigate(`/transaction/${id}`)
          }
          transactions={transactions}
        />
      </Grid>
    </Page>
  )
}

export default BalancePage
