const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
    _id_mentorado: String,
    _id_mentor: String,
    nome_mentorado: String,
    contato_mentorado: String,
    email_mentorado: String,

}, {
    timestamps: true
});

const mentoria = mongoose.model('Mentoria', DataSchema);
module.exports = mentoria;
