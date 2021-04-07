const express = require('express')
const router = express.Router()

const stream = require('../api/stream')

router.get('/', function (req, res, next) {
  res.send('<h1>Video Player</h1>')
})

router.get('/stream', stream.stream)

module.exports = router
