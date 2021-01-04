const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pieceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },  
  y: {
    type: Number,
    required: true,
  },
  colour: {
    type: Boolean,
    required: true
  },
}, { timestamps: true });

const Piece = mongoose.model('Piece', PieceSchema);
module.exports = Piece;