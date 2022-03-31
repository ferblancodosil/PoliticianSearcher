const express = require('express');
const multer = require('multer');

const politicians = new express.Router();
const upload = multer({ dest: 'tmp/csv/' });
const { uploadFile, search } = require('../controllers/politicians.js');

politicians.post('/bulk', upload.single('file'), uploadFile);
politicians.get('/', search);

module.exports = {
  politicians
}
