const { parseCSV } = require('../services/csv')
const { bulkData, search: searchService } = require('../services/elastic')

const uploadFile = async (req, res) => {
  try {
    const data = await parseCSV(req.file)
    const response = await bulkData(data)
    res.status(200).json(response)
  } catch (e) {
    return res.status(412).send(`${e}`)
  }
}

const search = async (req, res) => {
  try{
    const response = await searchService({filter: req.query.filter, page: 0})
    res.status(200).json(response)
  } catch (e) {
    return res.status(500).send(`${e}`)
  }
}

module.exports = {
  uploadFile,
  search
}
