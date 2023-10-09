const express = require('express')
const router = express.Router()

const { Transactions } = require('../class/transactions')
const { Notifications } = require('../class/Notifications')
const { User } = require('../class/user')

// ================================================================

router.post('/balance', function (req, res) {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const user = User.getById(Number(userId))

    const transactions =
      Transactions.getTransactionsByUserID(
        Number(user.id),
      ).reverse()

    const balance = Transactions.getBallanceByUserID(
      Number(user.id),
    )

    const session = {
      balance,
      transactions,
    }

    return res.status(200).json({
      message: 'Data received',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.post('/recive', function (req, res) {
  const { sum, email, paymentSystem } = req.body

  if (!sum || !paymentSystem || !email) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const user = User.getByEmail(email)

    Transactions.receiveMoney(user, sum, paymentSystem)

    return res.status(200).json({
      message: 'Money received',
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.post('/send', function (req, res) {
  const { sum, email, payTo } = req.body

  if (!sum || !email || !payTo) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const user = User.getByEmail(email)

    const userPayTo = User.getByEmail(payTo)

    if (!userPayTo) {
      return res.status(400).json({
        message:
          'Error. The email to which you are sending money does not exist',
      })
    }

    Transactions.sendMoney(user, sum, userPayTo)

    return res.status(200).json({
      message: 'Money has been sent',
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.get('/transaction/:id', function (req, res) {
  const { id } = req.params

  try {
    const transaction = Transactions.getTransactionById(
      Number(id),
    )

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      })
    }
    const session = { transaction }
    return res.status(200).json({
      message: 'Connected',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.post('/notifications', function (req, res) {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const user = User.getById(Number(userId))

    const notifications = Notifications.getByUserId(
      user.id,
    ).reverse()

    const session = { notifications }
    return res.status(200).json({
      message: 'Money has been sent',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

module.exports = router
