const { parseCSV } = require('../services/csv')
const { bulkData } = require('../services/elastic')

const uploadFile = async (req, res) => {
  try {
    const data = await parseCSV(req.file)
    const response = await bulkData(data)
    res.status(200).json(response)
  } catch (e) {
    return res.status(412).send(`${e}`)
  }
}

module.exports = {
  uploadFile
}
