const swagger = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../configs/swagger.json');

swagger.use('/', swaggerUi.serve);
swagger.get('/', swaggerUi.setup(swaggerDocument));

module.exports = {
  swagger
}
