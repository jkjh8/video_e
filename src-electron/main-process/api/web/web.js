const { app } = require('electron')
const express = require('express')
const path = require('path')

const basedir = path.dirname(app.getPath('exe'))

const web = express()
const indexRouter = require('./routes')

web.use('/', indexRouter)
web.use('/', express.static(path.join(basedir, 'resources', 'public')))

module.exports = web
