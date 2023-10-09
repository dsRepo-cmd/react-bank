import React, { FC } from 'react'
import stripe from './svg/stripe.svg'
import coinbase from './svg/coinbase.svg'
import stripeMethod from './svg/stripe-method.svg'
import coinbaseMethod from './svg/coinbase-method.svg'
import cl from './PaymentSystemList.module.css'
import { FIELD_NAME } from '../../util/consts'

interface PaymentSystemListProps {
  onChange: (name: string, value: string) => void
}

const PaymentSystemList: FC<PaymentSystemListProps> = ({
  onChange,
}) => {
  const handlePaymentSystem = (
    name: string,
    value: string,
  ) => {
    onChange(name, value)
  }

  return (
    <div className={cl.list}>
      <button
        onClick={() =>
          handlePaymentSystem(
            FIELD_NAME.PAY_SYSTEM,
            'Stripe',
          )
        }
        className={cl.item}
      >
        <img src={stripe} alt="stripe" />
        <p>Stripe</p>
        <img src={stripeMethod} alt="stripeMethod" />
      </button>
      <button
        onClick={() =>
          handlePaymentSystem(
            FIELD_NAME.PAY_SYSTEM,
            'Coinbase',
          )
        }
        className={cl.item}
      >
        <img src={coinbase} alt="coinbase" />
        <p>Coinbase</p>
        <img src={coinbaseMethod} alt="coinbaseMethod" />
      </button>
    </div>
  )
}

export default PaymentSystemList
