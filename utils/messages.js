const moment = require('moment')
const formattedMsg = (username, msg) => {
  return {
    username,
    post: msg,
    date: moment().format('hh:mm a')
  }
}

module.exports = { formattedMsg }