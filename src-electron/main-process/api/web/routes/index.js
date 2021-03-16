const { app } = require('electron')
const express = require('express')
const path = require('path')
const router = express.Router()

const stream = require('../api/stream')

router.get('/', function (req, res, next) {
  const baseDir = path.dirname(app.getPath('exe'))
  res.sendFile(path.join(baseDir, 'resources', 'public', 'index.html'))
})

router.get('/stream', stream.stream)

module.exports = router
