const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
    titulo: String,
    mentorado: String,
    mentor: String,
    concluida: { type: boolean, default: false },
    disponivel: { type: boolean, default: false },
    feedback: String,

}, {
    timestamps: true
});

const mentoria = mongoose.model('Mentoria', DataSchema);
module.exports = mentoria;
