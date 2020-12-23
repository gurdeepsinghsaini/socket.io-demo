const userForm = document.querySelector('.user-form')
const chatForm = document.querySelector('.chat-form')
const chatMessages = document.querySelector('.chat-messages')
const chatContainer = document.querySelector('.chat-container')


const socket = io()

// add to dom
function updateChat(message) {
  const div = document.createElement('div')
  div.innerHTML = `
  <p>${message.username}</p>
  <p>${message.date}</p>
  <p>${message.post}</p
  `
  chatMessages.append(div)

  chatMessages.scrollTop = chatMessages.scrollHeight
}

// receiving active user list from server
socket.on('userList', (users) =>{
  populateUser(users)
})

// messages received from server
socket.on('message', (message) => updateChat(message))


userForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // emit when new user joins
  socket.emit('addUser', e.target.username.value )
  userForm.style.display = 'none'
  chatForm.style.display = 'block'
  chatContainer.style.display = 'block'
})


chatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let msg = e.target.chatInput.value
  msg = msg.trim()
  if(!msg) {
    return false
  }
  // emit chat message
  socket.emit('chatMessage', msg)

  // reset input
  e.target.chatInput.value = ''
  e.target.chatInput.focus()
})


// add users to dom
const populateUser = (users) => {
  let userList = document.getElementById('userList')
  userList.innerHTML = ''
  users.forEach(user => {
    const li = document.createElement('li')
    li.innerText = user.username
    userList.append(li)
  })
}