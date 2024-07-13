import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

const server = http.createServer(app)
const io = new Server(server)

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', function (socket) {
  socket.on('send-location', function (data) {
    io.emit('receive-location', { id: socket.id, ...data })
  })
  socket.on('disconnect', function () {
    io.emit('user-disconnected', socket.id)
  })
})

app.get('/', function (req, res) {
  res.render('index')
})

server.listen(4040, () => {
  console.log('server start at 4040')
})
