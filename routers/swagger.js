const swagger = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../configs/swagger.json');

swagger.use('/api-docs', swaggerUi.serve);
swagger.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = {
  swagger
}
