const { WHITE_LIST } = require('./enviroment')

var corsOptions = {
  origin: function (origin, callback) {
    if ((WHITE_LIST === "*") || (Array.isArray(WHITE_LIST) && WHITE_LIST.indexOf(origin) !== -1)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }

}

module.exports = corsOptions
