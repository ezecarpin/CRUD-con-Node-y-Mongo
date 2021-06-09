const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
  cliente:  String,
  producto: String,
  precio: String,
  fecha: String,
  seña: String
});

// Crear el modelo
const Pedido = mongoose.model('Pedido', pedidosSchema);

module.exports = Pedido;