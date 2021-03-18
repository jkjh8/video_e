const { app } = require('electron')
const express = require('express')
const path = require('path')

const web = express()
const indexRouter = require('./routes')

web.use('/', indexRouter)
web.use('/', express.static(path.join(app.getPath('exe'), 'resources', 'public')))
web.use('/static', express.static(path.join(app.getPath('userData'), 'tmp')))

module.exports = web
