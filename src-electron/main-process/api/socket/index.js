const net = require('net')

const tcpClient = []
let tcpServer

const server = {
  read: (port, callback) => {
    tcpServer = net.createServer((socket) => {
      tcpServer.on('connection', () => {
        console.log('client connect')
        tcpClient.push(socket)
      })
      socket.on('data', (data) => {
        socket.write('ok')
        callback(data.toString())
      })
      socket.on('close', () => {
        tcpClient.splice(tcpClient.indexOf(socket), 1)
      })
      socket.on('error', (err) => {
        console.log('socket error: ', JSON.stringify(err))
      })
    })
    tcpServer.listen(port, () => {
      console.log(`start tcpServer on ${port}`)
      tcpServer.on('close', () => {
        console.log('tcpServer close')
      })
      tcpServer.on('error', (err) => {
        console.log('tcpServer error: ', JSON.stringify(err))
      })
    })
  },
  send: (data) => {
    tcpClient.forEach(client => {
      client.write(data)
    })
  },
  close: () => { tcpServer.close() }
}

export default server
