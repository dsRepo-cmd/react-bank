import React from 'react'
import cl from './TransactionContent.module.css'
import {
  extractCents,
  extractDollars,
} from '../../util/money'
import { formatDate } from '../../util/getDate'
import { Transaction } from '../../util/consts'

interface TransactionContentProps {
  transaction: Transaction
}

const TransactionContent: React.FC<
  TransactionContentProps
> = ({ transaction }) => {
  return (
    <>
      {' '}
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
    </>
  )
}

export default TransactionContent
