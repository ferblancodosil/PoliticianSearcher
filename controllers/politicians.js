const { parseCSV } = require('../services/csv')
const { bulkData, search: searchService, getById: getByIdService } = require('../services/elastic')

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
    const response = await searchService(req.query)
    res.status(200).json(response)
  } catch (e) {
    return res.status(500).send(`${e}`)
  }
}

const getById = async (req, res) => {
  try{
    const response = await getByIdService(req.params)
    res.status(200).json(response)
  } catch (e) {
    return res.status(404).send(`${e}`)
  }
}

module.exports = {
  uploadFile,
  search,
  getById
}
