const { Client } = require('@elastic/elasticsearch')
const { ELASTIC, ELASTIC_INDEX_NAME, REMOVE_INDEX_BEFORE_BULK } = require('../configs/enviroment')
// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/basic-config.html
const client = new Client({
  node: ELASTIC
})
const properties = {
  TITULAR: { type: 'text' },
  PARTIDO: { type: 'text' },
  PARTIDO_PARA_FILTRO: { type: 'text' },
  GENERO: { type: 'text' },
  CARGO: { type: 'text' },
  CARGO_PARA_FILTRO: { type: 'text' },
  INSTITUCION: { type: 'text' },
  CCAA: { type: 'text' },
  SUELDOBASE_SUELDO: { type: 'float'},
  COMPLEMENTOS_SUELDO: { type: 'float'},
  PAGASEXTRA_SUELDO: { type: 'float'},
  OTRASDIETASEINDEMNIZACIONES_SUELDO: { type: 'float'},
  TRIENIOS_SUELDO: { type: 'float'},
  RETRIBUCIONMENSUAL: { type: 'float'},
  RETRIBUCIONANUAL: { type: 'float'},
  OBSERVACIONES: { type: 'text' }
}

const bulkData = async (data) => {
  if (REMOVE_INDEX_BEFORE_BULK) await client.indices.delete({ index: ELASTIC_INDEX_NAME })
  await client.indices.create({
    index: ELASTIC_INDEX_NAME,
    body: {
      mappings: {
        properties
      }
    }
  }, { ignore: [400] })

  const body = data.flatMap(doc => [{ index: { _index: ELASTIC_INDEX_NAME } }, doc])
  const { body: bulkResponse } = await client.bulk({ refresh: true, body })


  const totalAdd = await client.count({ index: ELASTIC_INDEX_NAME })
  return { total_elements: data.length, elements_in_index: totalAdd.body.count, errors: bulkResponse.errors ? bulkResponse.items.length : 0 }


}


module.exports = {
  bulkData
}
