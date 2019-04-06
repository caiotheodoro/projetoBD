var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
  nome: String,
  sobrenome: String
});

var Usuario = mongoose.model('Usuario', UsuarioSchema, 'usuarios');

module.exports = Usuario;