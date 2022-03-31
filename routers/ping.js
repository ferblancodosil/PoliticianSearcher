const express = require('express');

const ping = new express.Router();
const { ping: pingController} = require('../controllers/ping.js');

ping.get('/ping', pingController);

module.exports = {
  ping
}
