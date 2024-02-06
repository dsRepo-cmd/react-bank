const express = require('express')
const router = express.Router()

const { Notifications } = require('../class/Notifications')
const { Confirm } = require('../class/Confirm')
const { User } = require('../class/User')
const { Session } = require('../class/Session')
const { NOTIFICATION_TYPE } = require('../util/const')

// ================================================================

router.post('/signup', function (req, res) {
  const { email, password } = req.body
  console.log(email, password)
  if (!email || !password) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(401).json({
        message:
          'A user with the same name is already exist',
      })
    }

    const newUser = User.create({ email, password })

    Notifications.createNotification({
      userId: newUser.id,
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Create account',
    })

    const session = Session.create(newUser)

    const { code } = Confirm.create(newUser.email)

    return res.status(200).json({
      message: 'The user is successfully registered',
      session,
      code,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Error creating user',
    })
  }
})

// ================================================================

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

  if (!code || !token) {
    return res.status(401).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const session = Session.get(token)
    console.log('Token', token)

    if (!session) {
      return res.status(400).json({
        message: 'Error. You are not logged in',
      })
    }
    const email = Confirm.getData(code)

    if (!email) {
      return res.status(400).json({
        message: 'The code does not exist',
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'The code is not valid',
      })
    }

    session.user.isConfirm = true

    User.confirmByEmail(email)

    return res.status(200).json({
      message: 'You have confirmed your email',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.post('/signin', function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Error. User with this e-mail does not exist',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Error. The password does not match',
      })
    }

    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Enter account',
    })

    const session = Session.create(user)

    session.user.isConfirm = true

    return res.status(200).json({
      message: 'You are logged in',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})
// ================================================================

router.post('/recovery', function (req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(401).json({
        message:
          'Such a user with such e-mail does not exist',
      })
    }
    Session.create(user)

    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.WARNING,
      message: 'Recovery password',
    })

    const { code } = Confirm.create(email)

    return res.status(200).json({
      message:
        'Password recovery code has been sent to your e-mail',
      code,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body

  if (!code || !password) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(401).json({
        message: 'No such code exists',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'The user with this e-mail does not exist',
      })
    }

    user.password = password

    const session = Session.create(user)

    return res.status(200).json({
      message: 'The password has been changed',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.post('/settings-email', function (req, res) {
  const { newEmail, email, password } = req.body

  if (!email || !password || !newEmail) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const user = User.updateEmail(newEmail, email, password)

    if (!user) {
      return res.status(400).json({
        message: `
          The password does not match or a new email already exists`,
      })
    }

    const session = Session.create(user)

    Confirm.create(newEmail)

    session.user.isConfirm = true

    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.WARNING,
      message: 'Change email',
    })

    return res.status(200).json({
      message: 'Email has been changed',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.post('/settings-password', function (req, res) {
  const { email, password, newPassword } = req.body

  if (!email || !password || !newPassword) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    const user = User.updatePassword(
      email,
      password,
      newPassword,
    )

    const session = Session.create(user)

    Confirm.create(email)
    if (!user) {
      return res.status(400).json({
        message: `Wrong password `,
      })
    }

    session.user.isConfirm = true

    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.WARNING,
      message: 'Change password',
    })

    return res.status(200).json({
      message: 'Password changed',
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
