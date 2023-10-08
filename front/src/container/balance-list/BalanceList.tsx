import React from 'react'
import cl from './BalanceList.module.css'
import {
  extractCents,
  extractDollars,
} from '../../util/money'
import { getTime } from '../../util/getDate'
import coinbase from './svg/coinbase.svg'
import stripe from './svg/stripe.svg'
import user from './svg/user.svg'
import { Transaction } from '../../util/consts'

interface BalanceListProps {
  transactions: Transaction[]
  onTransactionClick: (id: number) => void
}

const getTransactionImage = (sender: string) => {
  switch (sender) {
    case 'Coinbase':
      return coinbase
    case 'Stripe':
      return stripe
    default:
      return user
  }
}

const BalanceList: React.FC<BalanceListProps> = ({
  transactions,
  onTransactionClick,
}) => {
  return (
    <ul className={cl.list}>
      {transactions.map(
        ({ id, sender, type, amount, date }) => (
          <li
            className={cl.item}
            onClick={() => onTransactionClick(id)}
            key={id}
          >
            <img
              className={cl.item__img}
              src={getTransactionImage(sender)}
              alt="img"
            />

            <div className={cl.item__info}>
              <div className={cl.item__info__sender}>
                {sender}
              </div>
              <div className={cl.item__info__type}>
                {type}{' '}
                <span
                  className={cl.item__info__dote}
                ></span>{' '}
                {getTime(date)}
              </div>
            </div>
            <span
              className={`${cl.item__amount} ${
                amount <= 0
                  ? cl.item__amount__negative
                  : cl.item__amount__positive
              }`}
            >
              {extractDollars(amount)}
              <span className={cl.item__amount__cent}>
                {extractCents(amount)}
              </span>
            </span>
          </li>
        ),
      )}
    </ul>
  )
}

export default BalanceList
