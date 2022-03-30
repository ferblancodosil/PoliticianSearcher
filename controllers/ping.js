const pingService = require('../services/ping.js')

const ping = async (req, res) => {
  // const {user, content} = req.body
  const data = pingService.generatePing()
  res.status(200).json(data)
}

module.exports = {
  ping
}
