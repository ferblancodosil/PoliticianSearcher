const { Client } = require('@elastic/elasticsearch')
const { ELASTIC, ELASTIC_INDEX_NAME, REMOVE_INDEX_BEFORE_BULK, QUERY_RESULTS, FILTER_FIELDS } = require('../configs/enviroment')
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


const generateNotFilterQuery = (from = 0) => {
  return [
    { index: ELASTIC_INDEX_NAME },
    {
      query: {
        query_string: {
          query: "*",
          fields: FILTER_FIELDS
        }
      },
      from,
      size: QUERY_RESULTS,
    }
  ]
}

const generateFuzzyQuery = (filter, from = 0) => {
  return [
    { index: ELASTIC_INDEX_NAME },
    {
      from,
      size: QUERY_RESULTS,
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: filter,
                fields: FILTER_FIELDS,
                operator: "AND",
                fuzziness: "AUTO"
              }
            }
          ]
        }
      }
    }
  ]
}

const bulkData = async (data = []) => {
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

const search = async ({ filter = '', page = 0 } = {}) => {
  const query = !filter.length || filter === "*" ? generateNotFilterQuery(page*QUERY_RESULTS) : generateFuzzyQuery(filter, page*QUERY_RESULTS);
  const { body } = await client.msearch({
    body: query
  })
  if (body.responses.length > 0 && body.responses[0].status === 200) {
    return body.responses[0].hits.hits.map(h => Object.assign({ID: h._id}, h._source))
  } else {
    throw new Error("Query error")
  }
}


const getById = async ({ id } = {}) => {
  if (!id) {
    throw new Error("id param necessary")
  }
  const { body } = await client.msearch({
    body: [
      { index: ELASTIC_INDEX_NAME },
      {
        query: {
          query_string: {
            query: `_id:${id}`
          }
        }
      }
    ]
  })

  if (body.responses.length > 0 && body.responses[0].status === 200) {
    const element = body.responses[0].hits.hits.find(h => h._id === id)
    if (!element) {
      throw new Error(`Not found element by id ${id}`)
    }
    return Object.assign({ ID: element._id }, element._source)
  } else {
    throw new Error(`Not found element by id ${id}`)
  }
}

module.exports = {
  bulkData,
  search,
  getById
}
