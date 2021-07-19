const m = require('mongoose');

module.exports = m.model('thank', new m.Schema({
  guild: String,
  user: String,
  thanks: Number
}))