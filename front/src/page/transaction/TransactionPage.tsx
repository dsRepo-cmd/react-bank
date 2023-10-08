import React, { useState, useEffect, Fragment } from 'react'
import Page from '../../component/page/Page'
import Grid from '../../component/grid/Grid'
import cl from './TransactionPage.module.css'
import { useParams } from 'react-router-dom'
import StatusBar from '../../component/status-bar/StatusBar'
import BackLinkMenu from '../../component/back-link-menu/BackLinkMenu'
import { formatDate } from '../../util/getDate'
import {
  extractCents,
  extractDollars,
} from '../../util/money'
import {
  ResData,
  SERVER_IP,
  Transaction,
} from '../../util/consts'

// ==========================================================

const TransactionPage: React.FC = () => {
  const { transactionId } = useParams<{
    transactionId: string
  }>()

  const [transaction, setTransaction] =
    useState<Transaction | null>(null)

  // Send Data=============================================

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(
          `http://${SERVER_IP}/transaction/${transactionId}`,
        )

        const data: ResData = await res.json()
        console.log(data)
        if (res.ok) {
          setTransaction(data.session.transaction)
        }
      } catch (error: any) {}
    }
    fetchTransaction()
  }, [transactionId])

  if (transaction === null) {
    return <div>Loading...</div>
  }

  // ====================================================

  return (
    <Page backgroundColor="#F5F5F7">
      <Grid>
        <StatusBar />
        <BackLinkMenu title="Transaction" />

        <h1
          className={
            transaction.amount <= 0
              ? `${cl.amount} ${cl.amount__negative}`
              : `${cl.amount} ${cl.amount__positive}`
          }
        >
          {extractDollars(transaction.amount)}
          {extractCents(transaction.amount)}
        </h1>

        <div className={cl.list}>
          <div className={cl.list__item}>
            <div>Date</div>
            <div>{formatDate(transaction.date)}</div>
          </div>

          <div className={cl.list__divider}></div>

          <div>
            <div className={cl.list__item}>
              <div>Address</div>
              <div>{transaction.sender} </div>
            </div>
          </div>

          <div className={cl.list__divider}></div>

          <div>
            <div className={cl.list__item}>
              <div>Type</div>
              <div>{transaction.type} </div>
            </div>
          </div>
        </div>
      </Grid>
    </Page>
  )
}

export default TransactionPage
