// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const auth = require('./auth')
const session = require('./session')

router.use('/', auth)
router.use('/', session)
// ================================================================

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
