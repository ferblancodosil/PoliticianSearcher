const fs = require('fs');
const csv = require('csvtojson')

const properties = {
  TITULAR: 'string',
  PARTIDO: 'string',
  PARTIDO_PARA_FILTRO: 'string',
  GENERO: 'string',
  CARGO: 'string',
  CARGO_PARA_FILTRO: 'string',
  INSTITUCION: 'string',
  CCAA: 'string',
  SUELDOBASE_SUELDO: 'number',
  COMPLEMENTOS_SUELDO: 'number',
  PAGASEXTRA_SUELDO: 'number',
  OTRASDIETASEINDEMNIZACIONES_SUELDO: 'number',
  TRIENIOS_SUELDO: 'number',
  RETRIBUCIONMENSUAL: 'number',
  RETRIBUCIONANUAL: 'number',
  OBSERVACIONES: 'string'
}

const parseCSV = async ({ path } = {}) => {
  if (!path || !fs.existsSync(path)) {
    throw new Error("File required")
  }
  const data = await csv({colParser: properties, delimiter: ";"}).fromFile(path);
  fs.unlinkSync(path);
  return data
}

module.exports = {
  parseCSV
}
