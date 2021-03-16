const fs = require('fs')

module.exports.stream = function (req, res, next) {
  const type = req.query.type
  const file = req.query.file
  const filePath = fs.statSync(file)
  const fileSize = filePath.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, '').split(' - ')
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
    const chunksize = (end - start) + 1
    const fileStream = fs.createReadStream(file, { start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': type
    }
    res.writeHead(206, head)
    fileStream.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': type.split('/')[0]
    }
    res.writeHead(200, head)
    fs.createReadStream(filePath).pipe(res)
  }
}
