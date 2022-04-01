require("./envfunc")();

module.exports = {
  ELASTIC: process.env.ELASTIC || 'http://localhost:9200',
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET || "secret",
  NODE_ENV: process.env.NODE_ENV || "development",
  ELASTIC_INDEX_NAME: process.env.ELASTIC_INDEX_NAME || 'politician',
  REMOVE_INDEX_BEFORE_BULK: process.env.REMOVE_INDEX_BEFORE_BULK === undefined ? true : process.env.REMOVE_INDEX_BEFORE_BULK,
  FILTER_FIELDS: process.env.FILTER_FIELDS || ["TITULAR"],
  QUERY_RESULTS: process.env.QUERY_RESULT || 50,
  WHITE_LIST: process.env.WHITE_LIST || '*'
};
