const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const { addUser, userLeave, getCurrentUser, getUsers } = require('./utils/users')
const { formattedMsg } = require('./utils/messages')
app.use(express.static(path.join(__dirname, 'public')))


const server = http.createServer(app)
const io = require('socket.io')(server)

const botName = 'StupidBot'
let usersvtwo = {}
// connection open
io.on('connection', (socket) => {
  console.log('connected via ws...')
 
  // adding user
  socket.on('addUser', (username) => {
    const user = addUser(socket.id, username)
    usersvtwo[username] = socket.id
    socket.join(usersvtwo[username])
    // socket.emit('message', formattedMsg(botName, 'Welcome to the demo'))

    // socket.broadcast.emit('message', formattedMsg(botName, `${user.username} has joined the chat`))

    io.emit('userList',getUsers())
  })

  // incoming chat messages
  socket.on('chatMessage', (data) => {
    const user = getCurrentUser(socket.id)
    if (user) {
      io.to(usersvtwo[data.targetUser]).emit('message', formattedMsg(user.username, data.msg))
      socket.emit('message',formattedMsg(user.username, data.msg))
    }
  })

  socket.on('privateChat', (data) => {
    console.log(`private chat between ${data.currentUser} & ${data.targetUser}`)
  })

  // when user disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    // if (user) {
    //   io.emit('message', formattedMsg(botName, `${user.username} has left the chat`))
    // }

    io.emit('userList',getUsers())
  })
})



const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})