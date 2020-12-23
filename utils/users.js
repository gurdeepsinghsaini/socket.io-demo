const users = []

const addUser = (id, username) => {
  const user = { id, username }
console.log(user)
  users.push(user)

  return user;
}

const userLeave = id => {
  const index = users.findIndex(u => u.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getCurrentUser = (id) => {
  return users.find(u=> u.id === id)
}

const getUsers = () => {
  return users
}

module.exports = {
  addUser, userLeave, getCurrentUser, getUsers
}